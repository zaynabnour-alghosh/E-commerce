<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use App\Models\Product;

class AdminController extends Controller
{
    function addOrUpdateProduct(Request $request, $id = "add"){
        if($id == "add"){
            $product = new Product;
        }else{
            $product = Product::find($id);
        }

        // $product->category_id = $request->category_id;
        $product->name = $request->name ? $request->name : $product->name;
        $product->description = $request->description;
        $product->price = $request->price;
        if ($request->hasFile('image_data')) {
            $image = $request->file('image_data');
            $extension = $image->getClientOriginalExtension();
            $filename = uniqid() . '.' . $extension;
            Storage::disk('public')->put($filename, file_get_contents($image));
            $product->image_data=$filename ? $request->category_id:$product->category_id;
        }   
        $product->category_id = $request->category_id ?$request->category_id:$product->category_id;
        $product->save();

        return json_encode(["products" => $product]);
    }

    function getProducts($id = null){
        if($id){
            $products= Product::find($id);
        }else{
            $products = Product::all();
        }
        
        return json_encode(["products" => $products]);
    }

    function deleteProduct($id){
        $product = Product::find($id)->delete();
        return json_encode(["success" => true]);
    }
}
