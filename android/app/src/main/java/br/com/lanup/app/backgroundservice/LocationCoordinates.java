package br.com.lanup.app.backgroundservice;

public class LocationCoordinates {
    public double latitude;
    public double longitude;
    public long timestamp;

    double getLatitude() {
        return latitude;
    }

    LocationCoordinates setLatitude(double latitude) {
        this.latitude = latitude;
        return this;
    }

    double getLongitude() {
        return longitude;
    }

    LocationCoordinates setLongitude(double longitude) {
        this.longitude = longitude;
        return this;
    }

    long getTimestamp() {
        return timestamp;
    }

    LocationCoordinates setTimestamp(long timestamp) {
        this.timestamp = timestamp;
        return this;
    }
}
