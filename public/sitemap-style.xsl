<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="2.0"
                xmlns:html="http://www.w3.org/TR/REC-html40"
                xmlns:sitemap="http://www.sitemaps.org/schemas/sitemap/0.9"
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes"/>
  <xsl:template match="/">
    <html xmlns="http://www.w3.org/1999/xhtml">
      <head>
        <title>XML Sitemap - Quadri Adekunle's Portfolio</title>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <style type="text/css">
          body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            font-size: 14px;
            color: #333;
            line-height: 1.6;
            margin: 0;
            padding: 0;
            background-color: #f9f9f9;
          }
          .wrapper {
            max-width: 1000px;
            margin: 0 auto;
            padding: 20px;
          }
          h1 {
            font-size: 24px;
            color: #2c3e50;
            margin: 20px 0;
            padding-bottom: 10px;
            border-bottom: 1px solid #eee;
          }
          .intro {
            background-color: #fff;
            border: 1px solid #e0e0e0;
            border-radius: 4px;
            padding: 15px;
            margin-bottom: 20px;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            background: white;
            box-shadow: 0 1px 3px rgba(0,0,0,0.1);
          }
          th {
            text-align: left;
            padding: 12px 15px;
            background-color: #2c3e50;
            color: white;
            font-weight: normal;
          }
          td {
            padding: 10px 15px;
            border-bottom: 1px solid #e0e0e0;
          }
          tr:hover {
            background-color: #f5f5f5;
          }
          a {
            color: #3498db;
            text-decoration: none;
          }
          a:hover {
            text-decoration: underline;
          }
          .footer {
            margin-top: 20px;
            text-align: center;
            color: #7f8c8d;
            font-size: 12px;
          }
        </style>
      </head>
      <body>
        <div class="wrapper">
          <h1>XML Sitemap</h1>
          <div class="intro">
            <p>This is an XML Sitemap generated for <strong>Quadri Adekunle's Portfolio</strong>.</p>
            <p>It's meant to be consumed by search engines like <a href="https://www.google.com/" target="_blank">Google</a> or 
            <a href="https://www.bing.com/" target="_blank">Bing</a> to help them find and index the content on this website.</p>
          </div>
          <table>
            <thead>
              <tr>
                <th>URL</th>
                <th>Last Modified</th>
                <th>Change Frequency</th>
                <th>Priority</th>
              </tr>
            </thead>
            <tbody>
              <xsl:for-each select="sitemap:urlset/sitemap:url">
                <tr>
                  <td>
                    <a href="{sitemap:loc}">
                      <xsl:value-of select="sitemap:loc"/>
                    </a>
                  </td>
                  <td>
                    <xsl:value-of select="concat(substring(sitemap:lastmod, 0, 11), concat(' ', substring(sitemap:lastmod, 12, 5))) "/>
                  </td>
                  <td>
                    <xsl:value-of select="sitemap:changefreq"/>
                  </td>
                  <td>
                    <xsl:value-of select="sitemap:priority"/>
                  </td>
                </tr>
              </xsl:for-each>
            </tbody>
          </table>
          <div class="footer">
            <p>This sitemap was generated on <xsl:value-of select="current-dateTime()"/></p>
            <p>Powered by <a href="https://create-react-app.dev/" target="_blank">Create React App</a></p>
          </div>
        </div>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
