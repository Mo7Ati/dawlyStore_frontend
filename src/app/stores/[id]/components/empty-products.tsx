function EmptyProducts() {
    return (
        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed bg-muted/30 py-16 px-6 text-center">
            <div className="mb-4 flex size-16 items-center justify-center rounded-full bg-muted">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="size-8 text-muted-foreground"
                >
                    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
                    <path d="M3 6h18" />
                    <path d="M16 10a4 4 0 0 1-8 0" />
                </svg>
            </div>
            <h3 className="text-lg font-semibold">No products found</h3>
            <p className="mt-2 max-w-sm text-sm text-muted-foreground">
                Try adjusting your filters or search to find what you&apos;re looking for.
            </p>
        </div>
    )
}
    
export default EmptyProducts       