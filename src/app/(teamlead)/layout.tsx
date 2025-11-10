export default function DecoratedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // Letakkan div dekorasi di sini
    <div className="relative">
      <div className="absolute top-0 w-[100%] h-[40%] bg-gradient-to-bl from-cyan-500 to-cyan-900 -z-10"></div>
      {children}
    </div>
  );
}
