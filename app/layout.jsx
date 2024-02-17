import Nav from "@components/Nav";
import Provider from "@components/Provider";
import "@style/globals.css";
export const metadata = {
  title: "Promptify",
  description: "Search & share AI prompt for free",
};
const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <Provider>
          <div className="main">
            <div className="gradient" />
          </div>
          <main className="app">
            <Nav />
            {children}
          </main>
        </Provider>
      </body>
    </html>
  );
};

export default RootLayout;
