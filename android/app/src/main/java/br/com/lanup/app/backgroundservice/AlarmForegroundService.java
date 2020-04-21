package br.com.lanup.app.backgroundservice;

import android.app.Notification;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.app.Service;
import android.content.Intent;
import android.os.Build;
import android.os.IBinder;

import androidx.annotation.Nullable;
import androidx.core.app.NotificationCompat;

public class AlarmForegroundService extends Service {

    @Override
    public int onStartCommand(Intent intent, int flags, int startId) {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            NotificationCompat.Builder builder = new NotificationCompat.Builder(this, EventConstant.CHANNEL_ID);
            builder.setContentTitle("LanUp");
            builder.setContentText("Você está pronto pra receber job");
            builder.setOngoing(true);

            Notification notification = builder.build();

            NotificationManager notificationManager = getSystemService(NotificationManager.class);

            NotificationChannel notificationChannel = new NotificationChannel(
                    EventConstant.CHANNEL_ID,
                    "On-going Notification",
                    NotificationManager.IMPORTANCE_MIN
            );

            notificationManager.createNotificationChannel(notificationChannel);

            startForeground(123, notification);
        }
        return START_STICKY;
    }

    @Nullable
    @Override
    public IBinder onBind(Intent intent) {
        return null;
    }
}
