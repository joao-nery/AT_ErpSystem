import "@/app/globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <head>
        <title>AT-ERP System</title>
      </head>
      <body>{children}</body>
    </html>
  );
}
