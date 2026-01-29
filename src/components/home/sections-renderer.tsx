import { Section } from "@/types/home-types"
import { HeroSection } from "@/components/home/hero-section"
import { FeaturesSection } from "@/components/home/features-section"
import { StoreList } from "@/components/home/store-list"
import { CTASection } from "@/components/home/cta-section"
import ProductList from "@/components/home/product-list"
import ShopByCategories from "@/components/home/shop-by-category"

const SectionsRenderer = ({ sections }: { sections: Section[] }) => {
    // Sort sections by order
    const sortedSections = [...sections].sort((a, b) => a.order - b.order)

    // Map section type to component
    const renderSection = (section: Section) => {
        // Extract type as string (handling both object and string types)
        const sectionType = typeof section.type === 'string'
            ? section.type
            : (section.type as any)?.HERO || (section.type as any)?.FEATURES || String(section.type)

        switch (sectionType) {
            case 'hero':
                return <HeroSection key={section.id} data={section.data} />
            case 'features':
                return <FeaturesSection key={section.id} features={section.data} />
            case 'stores':
                return <StoreList key={section.id} data={section.data} />
            case 'products':
                return <ProductList key={section.id} data={section.data} />
            case 'categories':
                return <ShopByCategories key={section.id} data={section.data} />
            case 'vendor_cta':
                return <CTASection key={section.id} data={section.data} />
            default:
                console.warn(`Unknown section type: ${sectionType}`)
                return null
        }
    }

    return (
        <div>
            {sortedSections.map(renderSection)}
        </div>
    )
}

export default SectionsRenderer