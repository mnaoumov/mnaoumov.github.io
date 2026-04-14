---
description: How to extract files and folders from a bare git repository using git archive, avoiding encoding and binary issues.
tagLinks:
  - "[migrated-from-wordpress](<../Tags/migrated-from-wordpress.md>)"
  - "[git](<../Tags/git.md>)"
  - "[powershell](<../Tags/powershell.md>)"
  - "[bare-repo](<../Tags/bare-repo.md>)"
  - "[scripting](<../Tags/scripting.md>)"
pubDatetime: 2013-02-27T00:00:00-07:00
created: 2026-04-10T08:03:36-06:00
updated: 2026-04-10T18:34:03-06:00
title: "git checkout on bare repo"
url:
  - https://mnaoumov.wordpress.com/2013/02/27/git-checkout-on-bare-repo/
disabled rules:
  - yaml-title
---

# 2013-02-27 git checkout on bare repo

Hi folks

In this blogpost I tell you how to checkout specific files and folders from a bare repo. If you cannot imagine a scenario when it may be required see my [next blogpost](<./2013-02-27 git server-side hooks - maintenance.md>) :)

For non-bare repos, task is simple

```bash
git checkout mybranch folder/file.txt
```

it gives us a way to get file even if we are on a different branch

But for bare repos, it is more difficult

Let's try the same command from bare repo, and get the following result

```bash
fatal: This operation must be run in a work tree
```

After googling the issue we can find several approaches

# Cloning

```powershell
git clone . __temp
Push-Location -Path __temp
git checkout origin/mybranch folder/file.txt
Copy-Item -Path folder\file.txt -Destination path\to\destination
Pop-Location
Delete-Item -Path __temp -Recurse -Force
```

This approach is very inefficient, you have to clone the whole repo, and this can take time and space.

# Git Show or Git Cat-file

```powershell
git show master:folder/file.txt > path\to\destination\file.txt
```

or

```powershell
git cat-file blob master:folder/file.txt > path\to\destination\file.txt
```

These approaches would work fine only for text files

And have many problems

- **Encoding**. By default ">" operator in PowerShell would write file in UTF-16 encoding.

    Well we can use more verbose syntax with explicit encoding

    ```powershell

git show master:folder/file.txt | Out-File -FilePath path\to\destination\file.txt -Encoding Ascii

```

    This is lame. We had to know desired encoding before hand.

- **Line endings**. Result file always has CRLF ending, no matter what ending file actually has.
- **Binary files**. Binary file is corrupted.
- **Folders**. There is no way to extract whole folder with all files inside.

So, none of these approaches worked.

And then I found one which works perfectly

## git archive

It is probably a dirty hack, but it works

```powershell
git archive mybranch folder/file.txt --output result.tar
```

It creates a tar archive with desired content, exactly the file that sits in the source control.

It works fine with folders as well.

So we can write a helper

```powershell
function Git-CheckoutFile
{
    param
    (
        [string] $Branch,
        [string] $RelativeFilePath,
        [string] $DestinationFolder
    )

    if ($RelativeFilePath -eq ".")
    {
        $RelativeFilePath = "*"
    }

    $RelativeFilePath = $RelativeFilePath -replace "\\", "/"

    $tempDir = [Guid]::NewGuid()
    New-Item -Path $tempDir -ItemType Directory | Out-Null

    git archive $Branch $RelativeFilePath --output "$tempDir\__temp.tar"
    tar -xf "$tempDir/__temp.tar" -C $tempDir
    Remove-Item "$tempDir/__temp.tar"

    if (-not (Test-Path $DestinationFolder))
    {
        New-Item -Path $DestinationFolder -ItemType Directory | Out-Null
    }

    Copy-Item -Path "$tempDir/$RelativeFilePath" -Destination $DestinationFolder -Recurse

    Remove-Item -Path $tempDir -Recurse -Force
}
```

This works as a charm

```powershell
Git-CheckoutFile -Branch mybranch -RelativeFilePath folder\file.txt -DestinationFolder path\to\destination
```

Explanation of how it works is pretty simple

We create a tar archive with required files in a temp folder. Then we unpack it. Then we copy desired files into destination folder.

We cannot unpack straight into destination folder, because archive preserved repo's tree structure, which we don't need.

Line \#10-13 wrote to support checkout of whole branch using syntax

```powershell
Git-CheckoutFile -Branch mybranch -RelativeFilePath . -DestinationFolder path\to\destination
```

We need to change . (dot) into \* (asterisk) because otherwise line \#29 will produce an incorrect result.

Hope you've been as excited as I was :)

P.S. According to [stackoverflow](http://stackoverflow.com/questions/160608/how-to-do-a-git-export-like-svn-export) I should be able to combine lines \#20-21 and extract tar file on a fly without creating it.

```powershell
git archive $Branch $RelativeFilePath | tar -xf -
```

But this did not work for me

```bash
"C:/Program Files (x86)/Git/bin/tar.exe": Malformed extended header: missing newline
"C:/Program Files (x86)/Git/bin/tar.exe": Substituting `.' for empty member name
"C:/Program Files (x86)/Git/bin/tar.exe": .: Cannot open: File exists
"C:/Program Files (x86)/Git/bin/tar.exe": Substituting `.' for empty member name
"C:/Program Files (x86)/Git/bin/tar.exe": .: Cannot open: File exists
"C:/Program Files (x86)/Git/bin/tar.exe": Exiting with failure status due to previous errors
```

I suspect that this is because of the Windows line endings
