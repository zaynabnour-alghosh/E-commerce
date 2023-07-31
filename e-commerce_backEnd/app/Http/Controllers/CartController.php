<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use App\Models\Product;
use App\Models\Cart;
use App\Models\User;
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
// $userId = auth()->user()->id;

    public function getCartProducts(Request $request)
    {   
        $userId = $request->user_id;
        $products = DB::table('products')
            ->join('carts', 'products.id', '=', 'carts.product_id')
            ->join('users', 'users.id', '=', 'carts.user_id')
            ->select('products.*','products.id', DB::raw('count(*) as count'))
            ->where('user_id', $userId)
            ->groupBy('products.id','products.name',
            'products.description','products.price',
            'products.image_data','products.category_id','products.created_at','products.updated_at')
            ->distinct('products.name')
            ->get();
        return response()->json($products);
    }
}
