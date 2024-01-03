<?php

namespace App\Console\Commands;

use App\Models\EnLocation;
use Illuminate\Console\Command;

class UpdateEtatLocation extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'update:etat-location';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Mettre à jour la colonne état en fonction de la date de début et de fin';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $now = now();

        EnLocation::where(function ($query) use ($now) {
            $query->whereDate('date_debut_location', '<=', $now)
                  ->whereDate('date_fin_location', '>=', $now);
        })->update(['etat' => 1]);

        EnLocation::where(function ($query) use ($now) {
            $query->whereDate('date_debut_location', '>', $now)
                  ->orWhereDate('date_fin_location', '<', $now);
        })->update(['etat' => 0]);

        $this->info('Etats des locations mis à jour avec succès.');
    }
}
