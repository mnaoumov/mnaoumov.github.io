---
description: "Step-by-step guide to integrating SyntaxHighlighter 3 with Blogger using jQuery autoLoader to support all languages."
tagLinks:
  - "[migrated-from-blogger](<../Tags/migrated-from-blogger.md>)"
  - "[blogger](<../Tags/blogger.md>)"
  - "[syntax-highlighting](<../Tags/syntax-highlighting.md>)"
  - "[javascript](<../Tags/javascript.md>)"
  - "[jquery](<../Tags/jquery.md>)"
pubDatetime: 2012-06-20T00:20:00-07:00
created: 2026-04-10T08:03:36-06:00
updated: 2026-04-13T13:06:53-06:00
title: "The proper way to use Syntax Highlighter with Blogger"
url:
  - https://mnaoumov.blogspot.com/2012/06/proper-way-to-use-code-highlighter-with.html
disabled rules:
  - yaml-title
---

# 2012-06-20 The proper way to use Syntax Highlighter with Blogger

I wanted to integrate **SyntaxHighlighter** ([http://alexgorbatchev.com/SyntaxHighlighter/](http://alexgorbatchev.com/SyntaxHighlighter/)) with my **Blogger**. In version 3.0 the author introduced feature **autoLoader** ([http://alexgorbatchev.com/SyntaxHighlighter/manual/api/autoloader.html](http://alexgorbatchev.com/SyntaxHighlighter/manual/api/autoloader.html)) which loads only those scripts that are actually required.

I wanted to add support for every language supported by this highlighter.

Initially this didn't work because the **autoLoader** script was executed prior to DOM loaded so it decided that there are no syntaxes to load. To fix that I am using jQuery.

The following instruction is mostly copy-pasted from [http://www.commonitman.com/2010/09/how-to-use-syntax-highlighter-3-in.html](http://www.commonitman.com/2010/09/how-to-use-syntax-highlighter-3-in.html)

1. Navigate to **_Dashboard > Design > Edit HTML_**
2. Backup the current template by clicking on the link **_Download Full Template_**
3. In the textarea, press _CTRL+F_ to find the code **_</head>_**
4. Copy the below code and paste it just above

    ```html
    <!-- Syntax Highlighter Additions START -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js"> 
    </script>

    <link href="//alexgorbatchev.com/pub/sh/current/styles/shCore.css" rel="stylesheet" type="text/css">
    <link href="//alexgorbatchev.com/pub/sh/current/styles/shThemeDefault.css" rel="stylesheet" type="text/css">

    <script src="//alexgorbatchev.com/pub/sh/current/scripts/shCore.js" type="text/javascript"></script>

    <script src="//alexgorbatchev.com/pub/sh/current/scripts/shAutoloader.js" type="text/javascript"></script>

    <script language="javascript" type="text/javascript">
        $(function() {
            var baseUrl = 'http://alexgorbatchev.com/pub/sh/current/scripts/';
            SyntaxHighlighter.autoloader(
          // ActionScript3
          ['as3', 'actionscript3', baseUrl + 'shBrushAS3.js'],

          // Bash/shell
          ['bash', 'shell', baseUrl + 'shBrushBash.js'],

          // ColdFusion
          ['cf', 'coldfusion', baseUrl + 'shBrushColdFusion.js'],

          // C#
          ['c-sharp', 'csharp', baseUrl + 'shBrushCSharp.js'],

          // C++
          ['cpp', 'c', baseUrl + 'shBrushCpp.js'],

          // CSS
          ['css', baseUrl + 'shBrushCss.js'],

          // Delphi
          ['delphi', 'pas', 'pascal', baseUrl + 'shBrushDelphi.js'],

          // Diff
          ['diff', 'patch', baseUrl + 'shBrushDiff.js'],

          // Erlang
          ['erl', 'erlang', baseUrl + 'shBrushErlang.js'],

          // Groovy
          ['groovy', baseUrl + 'shBrushGroovy.js'],

          // JavaScript
          ['js', 'jscript', 'javascript', baseUrl + 'shBrushJScript.js'],

          // Java
          ['java', baseUrl + 'shBrushJava.js'],

          // JavaFX
          ['jfx', 'javafx', baseUrl + 'shBrushJavaFX.js'],

          // Perl
          ['perl', 'pl', baseUrl + 'shBrushPerl.js'],

          // PHP
          ['php', baseUrl + 'shBrushPhp.js'],

          // Plain Text
          ['plain', 'text', baseUrl + 'shBrushPlain.js'],

          // PowerShell
          ['ps', 'powershell', baseUrl + 'shBrushPowerShell.js'],

          // Python
          ['py', 'python', baseUrl + 'shBrushPython.js'],

          // Ruby
          ['rails', 'ror', 'ruby', baseUrl + 'shBrushRuby.js'],

          // Scala
          ['scala', baseUrl + 'shBrushScala.js'],

          // SQL
          ['sql', baseUrl + 'shBrushSql.js'],

          // Visual Basic
          ['vb', 'vbnet', baseUrl + 'shBrushVb.js'],

          // XML
          ['xml', 'xhtml', 'xslt', 'html', 'xhtml', baseUrl + 'shBrushXml.js']
        );
        SyntaxHighlighter.config.bloggerMode = true;
        SyntaxHighlighter.all();
      });
    </script>
    <!-- Syntax Highlighter Additions END -->
    ```

5. Preview your changes and make modifications as required
6. Save the template
