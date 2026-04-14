---
description: "How to create a shared custom base class for T4 design-time templates by extending TextTransformation, with a working example."
tagLinks:
  - "[migrated-from-wordpress](<../Tags/migrated-from-wordpress.md>)"
  - "[t4](<../Tags/t4.md>)"
  - "[csharp](<../Tags/csharp.md>)"
  - "[code-generation](<../Tags/code-generation.md>)"
  - "[visual-studio](<../Tags/visual-studio.md>)"
  - "[dotnet](<../Tags/dotnet.md>)"
pubDatetime: 2012-09-27T00:00:00-07:00
created: 2026-04-10T08:03:36-06:00
updated: 2026-04-13T13:06:53-06:00
title: "T4 Design-Time templates base class"
url:
  - https://mnaoumov.wordpress.com/2012/09/27/t4-design-time-templates-base-class/
disabled rules:
  - yaml-title
---

# 2012-09-27 T4 Design-Time templates base class

Let's discuss how to provide a custom base class for design-time T4 templates.

If we can do that it will open us a way to extend T4 templates and add as many features as you wish.

First of all let's find how the generated code looks like

For that let's add new design-time template

```
<#@ Template Debug="True" Language="C#" \#>
<#@ Output Extension=".txt" \#>
Generated dll location: <#= this.GetType().Assembly.Location \#>
```

Save the template, open generated txt file and we will know where the generated _dll_ file is located. There should be corresponding _cs_ file in the same folder.

That class looks very similar to what Runtime template generates. The only difference is base class: **Microsoft.VisualStudio.TextTemplating.TextTransformation**

Then we open that class in Reflector (assembly **Microsoft.VisualStudio.TextTemplating.11.0**) and we will see that this file is not very different from Runtime templates base class we talked about in previous blogpost.

So we can slightly extend that class to support both Runtime and Design-time templates.

```csharp
 using System;
using System.CodeDom.Compiler;
using System.Collections.Generic;
using System.Globalization;
using System.Reflection;
using System.Text;

namespace T4Helper
{
    public abstract class TextTemplateBase : IDisposable
    {
        bool _endsWithNewline;
        CompilerErrorCollection _errors;
        StringBuilder _generationEnvironment;
        List<int> _indentLengths;

        protected TextTemplateBase()
        {
            CurrentIndent = "";
            ToStringHelper = new ToStringInstanceHelper();
        }

        ~TextTemplateBase()
        {
            Dispose(disposing: false);
        }

        /// <summary>
        /// Required to make this class a base class for T4 templates
        /// </summary>
        public abstract string TransformText();

        /// <summary>
        /// Initializes the TextTemplateBase class.
        /// </summary>
        public virtual void Initialize()
        {
        }

        /// <summary>
        /// The string builder that generation-time code is using to assemble generated output
        /// </summary>
        protected StringBuilder GenerationEnvironment
        {
            get { return _generationEnvironment ?? (_generationEnvironment = new StringBuilder()); }
            set { _generationEnvironment = value; }
        }

        /// <summary>
        /// The error collection for the generation process
        /// </summary>
        public CompilerErrorCollection Errors
        {
            get { return _errors ?? (_errors = new CompilerErrorCollection()); }
        }

        /// <summary>
        /// A list of the lengths of each indent that was added with PushIndent
        /// </summary>
        List<int> IndentLengths
        {
            get { return _indentLengths ?? (_indentLengths = new List<int>()); }
        }

        /// <summary>
        /// Gets the current indent we use when adding lines to the output
        /// </summary>
        public string CurrentIndent { get; private set; }

        /// <summary>
        /// Current transformation session
        /// </summary>
        public virtual IDictionary<string, object> Session { get; set; }

        /// <summary>
        /// Write text directly into the generated output
        /// </summary>
        public void Write(string textToAppend)
        {
            if (string.IsNullOrEmpty(textToAppend))
                return;
            // If we're starting off, or if the previous text ended with a newline,
            // we have to append the current indent first.
            if (GenerationEnvironment.Length == 0 || _endsWithNewline)
            {
                GenerationEnvironment.Append(CurrentIndent);
                _endsWithNewline = false;
            }
            // Check if the current text ends with a newline
            if (textToAppend.EndsWith(Environment.NewLine, StringComparison.CurrentCulture))
                _endsWithNewline = true;
            // This is an optimization. If the current indent is "", then we don't have to do any
            // of the more complex stuff further down.
            if (CurrentIndent.Length == 0)
            {
                GenerationEnvironment.Append(textToAppend);
                return;
            }
            // Everywhere there is a newline in the text, add an indent after it
            textToAppend = textToAppend.Replace(Environment.NewLine, Environment.NewLine + CurrentIndent);
            // If the text ends with a newline, then we should strip off the indent added at the very end
            // because the appropriate indent will be added when the next time Write() is called
            if (_endsWithNewline)
                GenerationEnvironment.Append(textToAppend, 0, textToAppend.Length - CurrentIndent.Length);
            else
                GenerationEnvironment.Append(textToAppend);
        }

        /// <summary>
        /// Write text directly into the generated output
        /// </summary>
        public void WriteLine(string textToAppend)
        {
            Write(textToAppend);
            GenerationEnvironment.AppendLine();
            _endsWithNewline = true;
        }

        /// <summary>
        /// Write formatted text directly into the generated output
        /// </summary>
        public void Write(string format, params object[] args)
        {
            Write(string.Format(CultureInfo.CurrentCulture, format, args));
        }

        /// <summary>
        /// Write formatted text directly into the generated output
        /// </summary>
        public void WriteLine(string format, params object[] args)
        {
            WriteLine(string.Format(CultureInfo.CurrentCulture, format, args));
        }

        /// <summary>
        /// Raise an error
        /// </summary>
        public void Error(string message)
        {
            Errors.Add(new CompilerError { ErrorText = message });
        }

        /// <summary>
        /// Raise a warning
        /// </summary>
        public void Warning(string message)
        {
            Errors.Add(new CompilerError { ErrorText = message, IsWarning = true });
        }

        /// <summary>
        /// Increase the indent
        /// </summary>
        public void PushIndent(string indent)
        {
            if (indent == null)
                throw new ArgumentNullException("indent");
            CurrentIndent = CurrentIndent + indent;
            IndentLengths.Add(indent.Length);
        }

        /// <summary>
        /// Remove the last indent that was added with PushIndent
        /// </summary>
        public string PopIndent()
        {
            string returnValue = "";
            if (IndentLengths.Count > 0)
            {
                int indentLength = IndentLengths[IndentLengths.Count - 1];
                IndentLengths.RemoveAt(IndentLengths.Count - 1);
                if (indentLength > 0)
                {
                    returnValue = CurrentIndent.Substring(CurrentIndent.Length - indentLength);
                    CurrentIndent = CurrentIndent.Remove(CurrentIndent.Length - indentLength);
                }
            }
            return returnValue;
        }

        /// <summary>
        /// Remove any indentation
        /// </summary>
        public void ClearIndent()
        {
            IndentLengths.Clear();
            CurrentIndent = "";
        }

        /// <summary>
        /// Helper to produce culture-oriented representation of an object as a string
        /// </summary>
        public ToStringInstanceHelper ToStringHelper { get; private set; }

        /// <summary>
        /// Releases the unmanaged resources used by the <see cref="T:Microsoft.VisualStudio.TextTemplating.TextTransformation"/> and optionally releases the managed resources.
        /// </summary>
        /// <param name="disposing">true to release both managed and unmanaged resources; false to release only unmanaged resources.</param>
        protected virtual void Dispose(bool disposing)
        {
            GenerationEnvironment = null;
            _errors = null;
        }

        public void Dispose()
        {
            Dispose(disposing: true);
            GC.SuppressFinalize(this);
        }

        /// <summary>
        /// Utility class to produce culture-oriented representation of an object as a string.
        /// </summary>
        public class ToStringInstanceHelper
        {
            IFormatProvider _formatProvider = CultureInfo.InvariantCulture;

            /// <summary>
            /// Gets or sets format provider to be used by ToStringWithCulture method.
            /// </summary>
            public IFormatProvider FormatProvider
            {
                get { return _formatProvider; }
                set
                {
                    if (value != null)
                        _formatProvider = value;
                }
            }

            /// <summary>
            /// This is called from the compile/run appdomain to convert objects within an expression block to a string
            /// </summary>
            public string ToStringWithCulture(object objectToConvert)
            {
                if (objectToConvert == null)
                    throw new ArgumentNullException("objectToConvert");
                Type t = objectToConvert.GetType();
                MethodInfo method = t.GetMethod("ToString", new[]
                                                                {
                                                                    typeof (IFormatProvider)
                                                                });
                if (method == null)
                    return objectToConvert.ToString();
                else
                {
                    return (string) (method.Invoke(objectToConvert, new object[]
                                                                        {
                                                                            _formatProvider
                                                                        }));
                }
            }
        }
    }
}
```

Then we can rebuild our project and can use this class as a base class for design-time templates

```bash
<#@ Template Debug="True" Language="C#" Inherits="T4Helper.TextTemplateBase" \#>
<#@ Assembly Name="$(ProjectDir)\$(OutDir)\T4Helper.dll" \#>
<#@ Output Extension=".txt" \#>
Generated dll location: <#= this.GetType().Assembly.Location \#>
```

Works as expected!
