---
description: "WCF ProtocolException truncates the server error response; an extension method on WebException extracts the full response body."
tagLinks:
  - "[migrated-from-wordpress](<../Tags/migrated-from-wordpress.md>)"
  - "[dotnet](<../Tags/dotnet.md>)"
  - "[wcf](<../Tags/wcf.md>)"
  - "[csharp](<../Tags/csharp.md>)"
  - "[debugging](<../Tags/debugging.md>)"
  - "[exception-handling](<../Tags/exception-handling.md>)"
pubDatetime: 2012-09-28T00:00:00-07:00
created: 2026-04-10T08:03:36-06:00
updated: 2026-04-13T13:06:53-06:00
title: "WCF _ useless ProtocolException"
url:
  - https://mnaoumov.wordpress.com/2012/09/28/wcf-protocolexception/
disabled rules:
  - yaml-title
---

# 2012-09-28 WCF _ useless ProtocolException

Imagine we have a program which uses WCF services.

```csharp
using (var client = new Service1Client())
{
    try
    {
        Console.WriteLine(client.DoWork());
    }
    catch (Exception e)
    {
        Console.WriteLine(e);
    }
}
```

Sometimes your WCF service stops to work and you are getting such exception on a client.

```html
System.ServiceModel.ProtocolException: The content type text/html; charset=utf-8 of the response message does not match the content type of the binding (text/xml; charset=utf-8). If using a custom encoder, be sure that the IsContentTypeSupported method is implemented properly. The first 1024 bytes of the response were: '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd"> 
<html xmlns="http://www.w3.org/1999/xhtml"> 
<head> 
<title>IIS 8.0 Detailed Error - 500.19 - Internal Server Error</title> 
<style type="text/css"> 
<!-- 
body{margin:0;font-size:.7em;font-family:Verdana,Arial,Helvetica,sans-serif;} 
code{margin:0;color:#006600;font-size:1.1em;font-weight:bold;} 
.config_source code{font-size:.8em;color:#000000;} 
pre{margin:0;font-size:1.4em;word-wrap:break-word;} 
ul,ol{margin:10px 0 10px 5px;} 
ul.first,ol.first{margin-top:5px;} 
fieldset{padding:0 15px 10px 15px;word-break:break-all;} 
.summary-container fieldset{padding-bottom:5px;margin-top:4px;} 
legend.no-expand-all{padding:2px 15px 4px 10px;margin:0 0 0 -12px;} 
legend{color:#333333;;margin:4px 0 8px -12px;_margin-top:0px; 
font-weight:bold;font-size:1em;} 
a:link,a:visited{color:#007EFF;font-weight:bold;} 
a:hover{text-decoration:none;} 
h1{font-size:2.4em;margin:0;color:#FFF;} 
h2{font-size:1.7em;margin:0'. ---> System.Net.WebException: The remote server returned an error: (500) Internal Server Error.
   at System.Net.HttpWebRequest.GetResponse()
   at System.ServiceModel.Channels.HttpChannelFactory`1.HttpRequestChannel.HttpChannelRequest.WaitForReply(TimeSpan timeout)
   --- End of inner exception stack trace ---

Server stack trace:
   at System.ServiceModel.Channels.HttpChannelUtilities.ValidateRequestReplyResponse(HttpWebRequest request, HttpWebResponse response, HttpChannelFactory`1 factory, WebException responseException, ChannelBinding channelBinding)
   at System.ServiceModel.Channels.HttpChannelFactory`1.HttpRequestChannel.HttpChannelRequest.WaitForReply(TimeSpan timeout)
   at System.ServiceModel.Channels.RequestChannel.Request(Message message, TimeSpan timeout)
   at System.ServiceModel.Dispatcher.RequestChannelBinder.Request(Message message, TimeSpan timeout)
   at System.ServiceModel.Channels.ServiceChannel.Call(String action, Boolean oneway, ProxyOperationRuntime operation, Object[] ins, Object[] outs, TimeSpan timeout)
   at System.ServiceModel.Channels.ServiceChannelProxy.InvokeService(IMethodCallMessage methodCall, ProxyOperationRuntime operation)
   at System.ServiceModel.Channels.ServiceChannelProxy.Invoke(IMessage message)

Exception rethrown at [0]: 
   at System.Runtime.Remoting.Proxies.RealProxy.HandleReturnMessage(IMessage reqMsg, IMessage retMsg)
   at System.Runtime.Remoting.Proxies.RealProxy.PrivateInvoke(MessageData& msgData, Int32 type)
   at ConsoleApplication1.ServiceReference1.IService1.DoWork()
   at ConsoleApplication1.ServiceReference1.Service1Client.DoWork() in c:\Dev\WebApplication2\ConsoleApplication1\Service References\ServiceReference1\Reference.cs:line 61
   at ConsoleApplication1.Program.Main(String[] args) in c:\Dev\WebApplication2\ConsoleApplication1\Program.cs:line 20
```

I find this exception absolutely useless. 'The first 1024 bytes'... There are no useful information in this 1024 bytes at all. Now I have to spend additional time to figure out what's going on. If I am lucky and **MyService.svc** is accessible from my system, I can find out what is the underlying error message. But what if it happened on a server we don't have access for? This is more and more difficult.

But fortunately there is a solution for that

**ProtocolException** has an inner **WebException** and we can extract whole response from it. It is tricky but still doable.

```csharp
 public static string ExtractResponseString(this WebException webException)
{
    if (webException == null || webException.Response == null)
        return null;

    var responseStream = webException.Response.GetResponseStream() as MemoryStream;

    if (responseStream == null)
        return null;

    var responseBytes = responseStream.ToArray();

    var responseString = Encoding.UTF8.GetString(responseBytes);
    return responseString;
}
```

Now I am using it from my program

```csharp
using (var client = new Service1Client())
{
    try
    {
        Console.WriteLine(client.DoWork());
    }
    catch (ProtocolException e)
    {
        var webException = e.InnerException as WebException;

        var responseString = webException.ExtractResponseString();

        if (string.IsNullOrEmpty(responseText))
            Console.WriteLine(e);
        else
            Console.WriteLine(responseString);
    }
    catch (Exception e)
    {
        Console.WriteLine(e);
    }
}
```

And now I am getting full response

```html
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd"> 
<html xmlns="http://www.w3.org/1999/xhtml"> 
<head> 
<title>IIS 8.0 Detailed Error - 500.19 - Internal Server Error</title> 
<style type="text/css"> 
<!-- 
body{margin:0;font-size:.7em;font-family:Verdana,Arial,Helvetica,sans-serif;} 
code{margin:0;color:#006600;font-size:1.1em;font-weight:bold;} 
.config_source code{font-size:.8em;color:#000000;} 
pre{margin:0;font-size:1.4em;word-wrap:break-word;} 
ul,ol{margin:10px 0 10px 5px;} 
ul.first,ol.first{margin-top:5px;} 
fieldset{padding:0 15px 10px 15px;word-break:break-all;} 
.summary-container fieldset{padding-bottom:5px;margin-top:4px;} 
legend.no-expand-all{padding:2px 15px 4px 10px;margin:0 0 0 -12px;} 
legend{color:#333333;;margin:4px 0 8px -12px;_margin-top:0px; 
font-weight:bold;font-size:1em;} 
a:link,a:visited{color:#007EFF;font-weight:bold;} 
a:hover{text-decoration:none;} 
h1{font-size:2.4em;margin:0;color:#FFF;} 
h2{font-size:1.7em;margin:0;color:#CC0000;} 
h3{font-size:1.4em;margin:10px 0 0 0;color:#CC0000;} 
h4{font-size:1.2em;margin:10px 0 5px 0; 
}#header{width:96%;margin:0 0 0 0;padding:6px 2% 6px 2%;font-family:"trebuchet MS",Verdana,sans-serif; 
 color:#FFF;background-color:#5C87B2; 
}#content{margin:0 0 0 2%;position:relative;} 
.summary-container,.content-container{background:#FFF;width:96%;margin-top:8px;padding:10px;position:relative;} 
.content-container p{margin:0 0 10px 0; 
}#details-left{width:35%;float:left;margin-right:2%; 
}#details-right{width:63%;float:left;overflow:hidden; 
}#server_version{width:96%;_height:1px;min-height:1px;margin:0 0 5px 0;padding:11px 2% 8px 2%;color:#FFFFFF; 
 background-color:#5A7FA5;border-bottom:1px solid \#C1CFDD;border-top:1px solid \#4A6C8E;font-weight:normal; 
 font-size:1em;color:#FFF;text-align:right; 
}#server_version p{margin:5px 0;} 
table{margin:4px 0 4px 0;width:100%;border:none;} 
td,th{vertical-align:top;padding:3px 0;text-align:left;font-weight:normal;border:none;} 
th{width:30%;text-align:right;padding-right:2%;font-weight:bold;} 
thead th{background-color:#ebebeb;width:25%; 
}#details-right th{width:20%;} 
table tr.alt td,table tr.alt th{} 
.highlight-code{color:#CC0000;font-weight:bold;font-style:italic;} 
.clear{clear:both;} 
.preferred{padding:0 5px 2px 5px;font-weight:normal;background:#006633;color:#FFF;font-size:.8em;} 
-->
</style> 

</head> 
<body> 
<div id="content"> 
<div class="content-container"> 
  <h3>HTTP Error 500.19 - Internal Server Error</h3> 
  <h4>The requested page cannot be accessed because the related configuration data for the page is invalid.</h4> 
</div> 

<div class="content-container"> 
 <fieldset><h4>Detailed Error Information:</h4> 
  <div id="details-left"> 
   <table border="0" cellpadding="0" cellspacing="0"> 
    <tr class="alt"><th>Module</th><td>&nbsp;&nbsp;&nbsp;IIS Web Core</td></tr> 
    <tr><th>Notification</th><td>&nbsp;&nbsp;&nbsp;Unknown</td></tr> 
    <tr class="alt"><th>Handler</th><td>&nbsp;&nbsp;&nbsp;Not yet determined</td></tr> 
    <tr><th>Error Code</th><td>&nbsp;&nbsp;&nbsp;0x8007000d</td></tr> 
    <tr class="alt"><th>Config Error</th><td>&nbsp;&nbsp;&nbsp;Configuration file is not well-formed XML
</td></tr> 
<tr><th>Config File</th><td>&nbsp;&nbsp;&nbsp;\\?\C:\Dev\WebApplication2\WebApplication2\web.config</td></tr> 
   </table> 
  </div> 
  <div id="details-right"> 
   <table border="0" cellpadding="0" cellspacing="0"> 
    <tr class="alt"><th>Requested URL</th><td>&nbsp;&nbsp;&nbsp;http://localhost:52664/Service1.svc</td></tr> 
    <tr><th>Physical Path</th><td>&nbsp;&nbsp;&nbsp;</td></tr> 
    <tr class="alt"><th>Logon Method</th><td>&nbsp;&nbsp;&nbsp;Not yet determined</td></tr> 
    <tr><th>Logon User</th><td>&nbsp;&nbsp;&nbsp;Not yet determined</td></tr> 
    <tr class="alt"><th>Request Tracing Directory</th><td>&nbsp;&nbsp;&nbsp;C:\Documents\IISExpress\TraceLogFiles\</td></tr> 
   </table> 
   <div class="clear"></div> 
  </div> 
 </fieldset> 
</div> 
  <div class="config_source content-container"> 
    <fieldset> 
    <h4>Config Source:</h4> 
    <pre><code><span class="highlight-code">    1: xzxs</span>
    2: &lt;?xml version=&quot;1.0&quot; encoding=&quot;utf-8&quot;?&gt;
</code></pre> 
    </fieldset> 
  </div> 

<div class="content-container"> 
 <fieldset><h4>More Information:</h4> 
  This error occurs when there is a problem reading the configuration file for the Web server or Web application. In some cases, the event logs may contain more information about what caused this error.<p></p><p></p>If you see the text "There is a duplicate 'system.web.extensions/scripting/scriptResourceHandler' section defined", this error is because you are running a .NET Framework 3.5-based application in .NET Framework 4.  If you are running WebMatrix, to resolve this problem, go to the Settings node to set the .NET Framework version to ".NET 2". You can also remove the extra sections from the web.config file. 
  <p><a href="http://go.microsoft.com/fwlink/?LinkID=62293&amp;IIS70Error=500,19,0x8007000d,9200">View more information &raquo;</a></p> 

 </fieldset> 
</div> 
</div> 
</body> 
</html>
```

It is probably too verbose but at least from here I can immediately understand what is the issue I have.

In line \#63 I see: **Configuration file is not well-formed XML**

Excellent! The issue is caught!
