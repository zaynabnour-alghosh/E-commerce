<?php

namespace App\Http\Controllers;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
class UserController extends Controller
{
    public function showUserInfo($id){
        $user=User::find($id);
        return response()->json($user);
    }
    public function updateUserInfo(Request $request,$id){
        $user=User::find($id);
        $user->first_name=$request->first_name;
        $user->last_name=$request->last_name;
        $user->email=$request->email;
        $user->address=$request->address;
        $user->phone=$request->phone;
        $user->first_name=$request->first_name;
        if(isset($request->password)){
            $user->passwrod=Hash::make($request->password);
        }
        $user->save();
        return response()->json(["updated_info"=>$user]);
    }
}
