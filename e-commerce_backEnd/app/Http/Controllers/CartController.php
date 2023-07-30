<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;
use App\Models\Cart;

class CartController extends Controller
{
    public function addToCart(Request $request)
{
    
    $productId= $request->product_id;
    $userId= $request->user_id; 
    // $userId = auth()->user()->id;
    $product = Product::find($productId);

    $cart = new Cart();
    $cart->user_id = $userId;
    $cart->product_id = $productId;
    $cart->quantity = 1;
    $cart->save();
    
    
    $responseData = [
        'name' => $product->name,
        'image' => $product->image_data,
        'quantity' => $cart->quantity,
    ];
    return response()->json($responseData);
}
}
