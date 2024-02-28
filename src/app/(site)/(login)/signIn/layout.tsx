export default function LoginLayout({
    children,
}: {
  children: React.ReactNode
}) {
    return(
        <>
            <div className="h-screen flex justify-center content-center flex-wrap">
                    {children}
            </div>
        </>
    )
}