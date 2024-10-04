use actix_web::{cookie::Cookie, web, App, HttpResponse, HttpServer, Responder};
use serde::{Serialize, Deserialize};
use mongodb::{Client, Collection, bson::doc};
use actix_cors::Cors;
use dotenv::dotenv;
use std::env;
use uuid::Uuid;
use futures::stream::TryStreamExt;
use actix_web::web::Data;

#[derive(Serialize, Deserialize)]
struct Countup {
    id: Uuid,
    count: i32,
}

#[derive(Serialize, Deserialize)]
struct Countdown {
    id: Uuid,
    count: i32,
}

async fn countUp(
    data: web::Data<Collection<Countup>>,
    countup: web::Json<Countup>,
) -> impl Responder {
    let result = data
        .insert_one(doc! {
            "id": countup.id.to_string(),
            "count": countup.count,
        }, None)
        .await;

    match result {
        Ok(_) => HttpResponse::Ok().finish(),
        Err(_) => HttpResponse::InternalServerError().finish(),
    }
}