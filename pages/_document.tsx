import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html>
      <Head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
(function() {
  try {
    var mode = localStorage.getItem('lightmode');
    var root = document.documentElement;
    root.classList.remove('lightmode-light', 'lightmode-dark', 'lightmode-native');
    switch (mode) {
      case 'light':
        root.classList.add('lightmode-light');
        break;
      case 'dark':
        root.classList.add('lightmode-dark');
        break;
      case 'system':
      default:
        root.classList.add('lightmode-native');
        break;
    }
  } catch(e) {}
})();
            `,
          }}
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
