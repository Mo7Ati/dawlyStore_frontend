import type { Metadata } from "next";
import { WishlistContent } from "./components/wishlist-content";

export const metadata: Metadata = {
  title: "Wishlist - DawlyStore",
  description: "View and manage the products you have saved on DawlyStore.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function WishlistPage() {
  return (
    <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold mb-6">Wishlist</h1>
      <WishlistContent />
    </main>
  );
}
