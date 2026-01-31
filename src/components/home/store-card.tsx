import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, MapPin, Store } from 'lucide-react';
import { ViewMode } from '@/services/stores/store-types';
import { Store as StoreType } from '@/types/store';

const StoreCard = ({ store, viewMode = 'grid' }: { store: StoreType, viewMode?: ViewMode }) => {

    const statusConfig = {
        open: {
            label: 'Open',
            className: 'bg-emerald-500/10 text-emerald-700 border-emerald-500/20',
            dotColor: 'bg-emerald-500',
        },
        closed: {
            label: 'Closed',
            className: 'bg-slate-500/10 text-slate-700 border-slate-500/20',
            dotColor: 'bg-slate-500',
        },
        busy: {
            label: 'Busy',
            className: 'bg-amber-500/10 text-amber-700 border-amber-500/20',
            dotColor: 'bg-amber-500',
        },
    };

    
    const currentStatus = statusConfig[store.is_active ? 'open' : 'closed'];
    // Grid View (Vertical Layout)
    if (viewMode === 'grid') {
        return (
            <Card className="group cursor-pointer hover:shadow-lg transition-shadow">
                <div className="p-6 space-y-4">
                    {/* Logo Section */}
                    <div className="flex justify-center">
                        <div className="w-20 h-20 rounded-xl overflow-hidden border">
                            <img
                                src={store.image_url.toString()}
                                alt={`${store.name} logo`}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>

                    {/* Store Name & Status */}
                    <div className="text-center space-y-2">
                        <h3 className="text-xl font-semibold">{store.name}</h3>
                        <Badge variant="outline">
                            {currentStatus.label}
                        </Badge>
                    </div>

                    {/* Description */}
                    <p className="text-sm text-muted-foreground text-center line-clamp-2">
                        {store.description}
                    </p>

                    {/* Divider */}
                    <div className="border-t" />

                    {/* Info Grid */}
                    <div className="space-y-3">
                        {/* Address */}
                        <div className="flex items-start gap-3">
                            <div className="shrink-0 w-8 h-8 rounded-lg border flex items-center justify-center">
                                <MapPin className="w-4 h-4" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-xs font-medium text-muted-foreground">Location</p>
                                <p className="text-sm line-clamp-1">{store.address}</p>
                            </div>
                        </div>

                        {/* Delivery Time */}
                        <div className="flex items-start gap-3">
                            <div className="shrink-0 w-8 h-8 rounded-lg border flex items-center justify-center">
                                <Clock className="w-4 h-4" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-xs font-medium text-muted-foreground">Delivery Time</p>
                                <p className="text-sm font-medium">{store.delivery_time} mins</p>
                            </div>
                        </div>
                    </div>
                </div>
            </Card>
        );
    }

    // List View (Horizontal Layout)
    return (
        <Card className="group cursor-pointer hover:shadow-lg transition-shadow">
            <div className="p-5">
                <div className="flex items-center gap-6">
                    {/* Logo Section */}
                    <div className="shrink-0">
                        <div className="w-24 h-24 rounded-xl overflow-hidden border">
                            <img
                                src={store.image_url.toString()}
                                alt={`${name} logo`}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="flex-1 min-w-0 space-y-3">
                        {/* Store Name & Status */}
                        <div className="flex items-center gap-3 flex-wrap">
                            <h3 className="text-2xl font-semibold">{store.name}</h3>
                            <Badge variant="outline">
                                {currentStatus.label}
                            </Badge>
                        </div>

                        {/* Description */}
                        <p className="text-sm text-muted-foreground line-clamp-2 max-w-2xl">
                            {store.description}
                        </p>

                        {/* Info Row */}
                        <div className="flex items-center gap-6 flex-wrap">
                            {/* Address */}
                            <div className="flex items-center gap-2.5">
                                <div className="flex-shrink-0 w-9 h-9 rounded-lg border flex items-center justify-center">
                                    <MapPin className="w-4 h-4" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-xs font-medium text-muted-foreground">Location</p>
                                    <p className="text-sm truncate max-w-xs">{store.address}</p>
                                </div>
                            </div>

                            {/* Delivery Time */}
                            <div className="flex items-center gap-2.5">
                                <div className="flex-shrink-0 w-9 h-9 rounded-lg border flex items-center justify-center">
                                    <Clock className="w-4 h-4" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-xs font-medium text-muted-foreground">Delivery</p>
                                    <p className="text-sm font-medium">{store.delivery_time} mins</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Card>
    );


}

export default StoreCard   