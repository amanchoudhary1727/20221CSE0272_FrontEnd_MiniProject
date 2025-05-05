
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { ShoppingCart } from "lucide-react";

const ChickenMarket = ({ coins = 0, onPurchase }) => {
  const { toast } = useToast();
  
  const items = [
    { id: 'feed', name: 'Premium Feed', price: 10, description: 'Organic, free-range corn', icon: '🌽' },
    { id: 'hat', name: 'Tiny Hat', price: 20, description: 'Pure fashion, zero function', icon: '🎩' },
    { id: 'bowtie', name: 'Bow Tie', price: 15, description: 'For the distinguished chicken', icon: '🎀' },
    { id: 'socks', name: 'Chicken Socks', price: 25, description: 'Why? Because you can', icon: '🧦' },
  ];

  const handlePurchase = (item) => {
    if (coins >= item.price) {
      onPurchase(item);
      toast({
        title: "Purchase Successful!",
        description: `You bought a ${item.name} for ${item.price} CluckCoins!`,
      });
    } else {
      toast({
        title: "Not Enough CluckCoins!",
        description: "Pet your chicken more to earn coins!",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="mt-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-2xl font-comic text-yellow-500">Chicken Market</h3>
        <div className="flex items-center gap-2">
          <ShoppingCart className="text-yellow-500" />
          <span className="font-bold">{coins} CluckCoins</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {items.map((item) => (
          <Card key={item.id} className="border-2 border-yellow-200 hover:border-yellow-400 transition-colors">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2">
                <span className="text-2xl">{item.icon}</span>
                {item.name}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-3">{item.description}</p>
              <div className="flex justify-between items-center">
                <span className="font-bold text-yellow-600">{item.price} CluckCoins</span>
                <Button 
                  onClick={() => handlePurchase(item)}
                  className="bg-yellow-500 hover:bg-yellow-600"
                  disabled={coins < item.price}
                >
                  Buy
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ChickenMarket;
