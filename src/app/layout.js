import HomeLayout from "./components/HomeLayout";
import "./globals.css";
import PostState from "./providers/PostProvider";
import AuthProvider from "./providers/AuthProvider";
import ThemeProvider from "./providers/ThemeProvide";
import NotificationProvider from "./providers/NotificationProvider";

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="max-w-screen-2xl mx-auto bg-[#e7e5df] dark:bg-[#1e1e1e]">
        <ThemeProvider>
          <AuthProvider>
              <PostState>
                <NotificationProvider>
                  <HomeLayout>
                       {children}
                  </HomeLayout>
                </NotificationProvider>
              </PostState>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
