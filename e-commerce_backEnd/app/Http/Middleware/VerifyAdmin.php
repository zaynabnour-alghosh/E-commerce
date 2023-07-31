<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use PHPOpenSourceSaver\JWTAuth;
class VerifyAdmin
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        try {
            $token = $request->bearerToken();
            $decodedToken = JWTAuth::decode($token);
            $userEmail = $decodedToken->getClaim('email');
    
            // Replace 'your_admin_email@example.com' with the email of your admin user
            if ($userEmail === 'zaynab@test.com') {
                return $next($request);
            } else {
                return response()->json(['message' => 'Unauthorized'], 401);
            }
        } catch (JWTException $e) {
            return response()->json(['message' => 'Invalid token'], 401);
        }
    }
}
