export const Navbar = () => {
    /**No tabs yet. Tabs will be added as more features are added */
    return (
        <nav className="fixed left-0 right-0 top-0 z-50 h-20 px-4 sm:px-6 lg:px-8 bg-[#0d1321]">
            <div className="flex mx-auto max-w-7xl h-full px-6 justify-between">
                <div id="logo" className="flex font-bold text-shadow-[#f18f01] h-full items-center text-lg md:text-2xl">
                    ThrottleIQ
                </div>
            </div>
        </nav>
    )
}