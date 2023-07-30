<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;
use App\Models\Favourite;

class FavouriteController extends Controller
{
    public function addToFavorites(Request $request)
    {
        $userId = $request->user_id;
        $productId = $request->product_id;
        $fav = Favourite::where([
            ['product_id', $productId],
            ['user_id', $userId]
        ])->first();
        if ($fav) {
            return response()->json(['message' => 'Product already favorited']);
        }
        
        $product=Product::find($productId);
        $favourite = new Favourite();
        $favourite->user_id = $userId;
        $favourite->product_id = $productId;
        $favourite->save();
        
        return response()->json([
            'message' => 'Product added to favorites',
            'product' => [
                'id' => $product->id,
                'name' => $product->name,
                'image' => $product->image_data
            ],
        ]);
    }
    public function removeFavorites(Request $request){
        $userId = $request->user_id;
        $productId = $request->product_id;        
        $fav =Favourite::where('product_id', $productId)
                       ->where('user_id', $userId)->delete();
        return json_encode(["success" => true]);
    }
}
