import type { Metadata } from "next";
import { getStoreCategories, getStores } from "@/services/stores/store-service";
import StoresContainer from "./_components/stores-container";

export const metadata: Metadata = {
  title: "Browse Stores - DawlyStore",
  description:
    "Discover verified vendors and local stores on DawlyStore. Filter by category, rating, and more to find the perfect shop.",
};

const StoresIndex = async (props: PageProps<"/stores">) => {
    const filters = await props.searchParams;
    const storesResponsePromise = getStores(filters)
    const categoriesResponsePromise = getStoreCategories()

    return (
        <StoresContainer
            storesResponsePromise={storesResponsePromise}
            categoriesResponsePromise={categoriesResponsePromise}
        />
    )
}

export default StoresIndex
