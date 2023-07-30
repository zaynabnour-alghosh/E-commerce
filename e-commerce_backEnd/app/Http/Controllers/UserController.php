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
}
