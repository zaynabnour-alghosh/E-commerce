<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class trialController extends Controller
{
    function test(Request $request){
       


        return json_encode(["first_name" => $request->first_name]);
    }
}
