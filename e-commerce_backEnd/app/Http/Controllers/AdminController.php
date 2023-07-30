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
            $product->image_data=$filename;
        }   
        $product->category_id = $request->category_id;
        $product->save();

        return json_encode(["products" => $product]);
    }

    
}
