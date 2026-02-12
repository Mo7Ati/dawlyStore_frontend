import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Store } from '@/types/store'
import { MapPin, Phone, Clock, Twitter, Facebook, Instagram } from 'lucide-react'
import Link from 'next/link'

interface StoreHeaderProps {
    store: Store
}

const StoreHeader = ({ store }: StoreHeaderProps) => {
    const {
        name,
        logo,
        description,
        address,
        phone,
        delivery_time,
        keywords,
    } = store

    return (
        <Card className="overflow-hidden">
            <CardContent className="p-6">
                <div className="flex flex-col gap-6 md:flex-row md:items-start">
                    {/* Logo and Name */}
                    <div className="flex items-center gap-4">
                        <Avatar className="size-20 ring-2 ring-border">
                            <AvatarImage
                                src={logo}
                                alt={name}
                                className="object-cover"
                            />
                            <AvatarFallback className="bg-primary/10 text-primary text-2xl font-semibold">
                                {name.slice(0, 2).toUpperCase()}
                            </AvatarFallback>
                        </Avatar>
                        <div>
                            <h1 className="text-2xl font-bold">{name}</h1>
                            <p className="text-muted-foreground text-sm max-w-md mt-1">
                                {description}
                            </p>
                        </div>
                    </div>

                    {/* Divider for larger screens */}
                    <div className="hidden md:block w-px bg-border self-stretch" />

                    {/* Contact Info */}
                    <div className="flex flex-col gap-3 flex-1">
                        {/* Address */}
                        <div className="flex items-start gap-2 text-sm">
                            <MapPin className="size-4 text-muted-foreground shrink-0 mt-0.5" />
                            <span className="text-muted-foreground">{address}</span>
                        </div>

                        {/* Phone */}
                        <div className="flex items-center gap-2 text-sm">
                            <Phone className="size-4 text-muted-foreground" />
                            <a
                                href={`tel:${phone}`}
                                className="text-muted-foreground hover:text-foreground transition-colors"
                            >
                                {phone}
                            </a>
                        </div>

                        {/* Delivery Time */}
                        <div className="flex items-center gap-2 text-sm">
                            <Clock className="size-4 text-muted-foreground" />
                            <span className="text-muted-foreground">
                                Delivery in {delivery_time} mins
                            </span>
                        </div>

                        {/* Keywords */}
                        {keywords && keywords.length > 0 && (
                            <div className="flex flex-wrap gap-2 ">
                                {keywords.map((keyword: string, index: number) => (
                                    <Badge key={index} variant="secondary" className="text-xs">
                                        {keyword}
                                    </Badge>
                                ))}
                            </div>
                        )}

                        {/* Social Media Links */}
                        {/* {social_media && (
                            <div className="flex items-center gap-3 mt-2">
                                {social_media.find((media: any) => media.platform === 'twitter') && (
                                    <Link
                                        href={social_media.twitter}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-muted-foreground hover:text-foreground transition-colors"
                                    >
                                        <Twitter className="size-5" />
                                    </Link>
                                )}
                                {social_media.facebook && (
                                    <Link
                                        href={social_media.facebook}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-muted-foreground hover:text-foreground transition-colors"
                                    >
                                        <Facebook className="size-5" />
                                    </Link>
                                )}
                                {social_media.instagram && (
                                    <Link
                                        href={social_media.instagram}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-muted-foreground hover:text-foreground transition-colors"
                                    >
                                        <Instagram className="size-5" />
                                    </Link>
                                )}
                            </div>
                        )} */}
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

export default StoreHeader
