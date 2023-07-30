<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;

class BuyerController extends Controller
{
     function getProducts($id = null){
        if($id){
            $products= Product::find($id);
        }else{
            $products = Product::all();
        }
        
        return json_encode(["products" => $products]);
    }
}
