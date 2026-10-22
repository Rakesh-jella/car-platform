<?php

namespace App\Console\Commands;

use App\Models\User;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Validator;

class CreateAdminUser extends Command
{
    protected $signature = 'app:create-admin-user';

    protected $description = 'Create the first administrator account for the warehouse ERP';

    public function handle(): int
    {
        $name = trim((string) $this->ask('Administrator name'));
        $email = trim((string) $this->ask('Administrator email'));

        $validator = Validator::make(
            ['name' => $name, 'email' => $email],
            ['name' => ['required', 'string', 'max:255'], 'email' => ['required', 'email', 'max:255']]
        );

        if ($validator->fails()) {
            $this->error($validator->errors()->first());

            return self::FAILURE;
        }

        if (User::query()->where('email', $email)->exists()) {
            $this->error('An account with this email already exists. No account was changed.');

            return self::FAILURE;
        }

        $password = (string) $this->secret('Password (minimum 12 characters)');
        $passwordConfirmation = (string) $this->secret('Confirm password');

        if (strlen($password) < 12) {
            $this->error('The password must be at least 12 characters.');

            return self::FAILURE;
        }

        if ($password !== $passwordConfirmation) {
            $this->error('The password confirmation does not match.');

            return self::FAILURE;
        }

        $admin = User::query()->create([
            'name' => $name,
            'email' => $email,
            'password' => $password,
        ]);
        $admin->forceFill(['is_admin' => true])->save();

        $this->info("Administrator account created for {$email}. Sign in at /admin/login.");

        return self::SUCCESS;
    }
}
