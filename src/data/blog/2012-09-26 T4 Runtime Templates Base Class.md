---
description: "Demonstrates extracting T4 runtime template auto-generated base class into a shared reusable C# base class for all templates."
tagLinks:
  - "[migrated-from-wordpress](<../Tags/migrated-from-wordpress.md>)"
  - "[t4](<../Tags/t4.md>)"
  - "[csharp](<../Tags/csharp.md>)"
  - "[code-generation](<../Tags/code-generation.md>)"
  - "[visual-studio](<../Tags/visual-studio.md>)"
  - "[dotnet](<../Tags/dotnet.md>)"
pubDatetime: 2012-09-26T00:00:00-07:00
created: 2026-04-10T08:03:36-06:00
updated: 2026-04-13T13:06:53-06:00
title: "T4 Runtime Templates Base Class"
url:
  - https://mnaoumov.wordpress.com/2012/09/27/t4-runtime-templates-base-class/
disabled rules:
  - yaml-title
---

# 2012-09-26 T4 Runtime Templates Base Class

Unfortunately out of the box T4 Runtime templates in Visual Studio have some issues

Let's discuss these issues one by one.

**Issue with base classes**

When we create **RuntimeTextTemplate1.tt** Visual Studio automatically generates nested C# file which contains **RuntimeTextTemplate1** and **RuntimeTextTemplate1Base** classes.

**RuntimeTextTemplate1** class contains actual generation logic generated from tt file. But **RuntimeTextTemplate1Base** class has absolutely common logic.

The issue here is in the fact that every single template will generate absolutely the same base class.

So ideally we would like to have only one base class for all templates.

Let's copy that generated base class to separate file and slightly clean it up without changing actual logic (for now). The only change I made is adding method **TransformText** which will be needed to use this class as a base class for other templates

```csharp
 using System;
using System.CodeDom.Compiler;
using System.Collections.Generic;
using System.Globalization;
using System.Reflection;
using System.Text;

namespace T4RuntimeTemplates
{
    public abstract class RuntimeTextTemplateBase
    {
        string _currentIndent = "";
        bool _endsWithNewline;
        CompilerErrorCollection _errors;
        StringBuilder _generationEnvironment;
        List<int> _indentLengths;

        /// <summary>
        /// Required to make this class a base class for T4 templates
        /// </summary>
        public abstract string TransformText();

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
        public string CurrentIndent
        {
            get { return _currentIndent; }
        }

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
                GenerationEnvironment.Append(_currentIndent);
                _endsWithNewline = false;
            }
            // Check if the current text ends with a newline
            if (textToAppend.EndsWith(Environment.NewLine, StringComparison.CurrentCulture))
                _endsWithNewline = true;
            // This is an optimization. If the current indent is "", then we don't have to do any
            // of the more complex stuff further down.
            if (_currentIndent.Length == 0)
            {
                GenerationEnvironment.Append(textToAppend);
                return;
            }
            // Everywhere there is a newline in the text, add an indent after it
            textToAppend = textToAppend.Replace(Environment.NewLine, Environment.NewLine + _currentIndent);
            // If the text ends with a newline, then we should strip off the indent added at the very end
            // because the appropriate indent will be added when the next time Write() is called
            if (_endsWithNewline)
                GenerationEnvironment.Append(textToAppend, 0, textToAppend.Length - _currentIndent.Length);
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
            _currentIndent = _currentIndent + indent;
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
                    returnValue = _currentIndent.Substring(_currentIndent.Length - indentLength);
                    _currentIndent = _currentIndent.Remove(_currentIndent.Length - indentLength);
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
            _currentIndent = "";
        }

        public RuntimeTextTemplateBase()
        {
            ToStringHelper = new ToStringInstanceHelper();
        }

        /// <summary>
        /// Helper to produce culture-oriented representation of an object as a string
        /// </summary>
        public ToStringInstanceHelper ToStringHelper { get; private set; }

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

Well done! Then if we want to modify existing template to use this newly created base class we just add **Inherits** attribute to the **<#@ directive**

```
<#@ Template Language="C#" Inherits="RuntimeTextTemplateBase" \#> ...
```

If we need to use the base class for template from different project you just need to specify full class name with namespace

```
<#@ Template Language="C#" Inherits="T4RuntimeTemplates.RuntimeTextTemplateBase"#> ...
```
