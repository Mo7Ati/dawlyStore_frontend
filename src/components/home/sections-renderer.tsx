import { ShopByCategories } from "@/app/(home)/components/shop-by-category"
import ProductList from "@/app/(home)/components/product-list"
import { HeroSection } from "@/app/(home)/components/hero-section"
import { FeaturesSection } from "@/app/(home)/components/features-section"
import { CTASection } from "@/app/(home)/components/cta-section"
import { Section } from '@/types/home-types'
import { StoreList } from "@/app/(home)/components/store-list"

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