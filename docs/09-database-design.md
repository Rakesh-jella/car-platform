# Database Design Plan

## Existing Tables

```text
users
import_requests
parts
vehicle_models
bill_of_materials
bom_items
manufacturing_orders
warehouses
inventories
inventory_transactions
vehicles

## Current Relationships

Warehouse
    ├── has many Inventories
    ├── has many Inventory Transactions
    └── has many Vehicles

Part
    ├── has many BOM Items
    ├── has many Inventories
    └── has many Inventory Transactions

Vehicle Model
    ├── has one Bill of Material
    ├── has many Manufacturing Orders
    └── has many Vehicles

Bill of Material
    └── has many BOM Items

BOM Item
    ├── belongs to Bill of Material
    └── belongs to Part

Vehicle
    ├── belongs to Warehouse
    └── optionally belongs to Vehicle Model


## Future Core Tables 

customers
suppliers
dealers

vehicle_brands
vehicle_variants
vehicle_images
vehicle_documents

quotations
orders
order_items
payments
invoices
deliveries

import_shipments
import_documents

export_orders
export_shipments
export_documents

production_stages
production_records
quality_inspections

notifications
activity_logs

## Planned Sales Relationship

Customer
    ├── has many Quotations
    ├── has many Orders
    ├── has many Payments
    └── has many Deliveries

Quotation
    └── may become one Order

Order
    ├── belongs to Customer
    ├── has many Order Items
    ├── has many Payments
    ├── has one Invoice
    └── has one Delivery

Order Item
    └── belongs to Vehicle


## Planned Import Relationship

Supplier
    ├── supplies Vehicles
    └── supplies Parts

Import Request
    └── may become an Import Shipment

Import Shipment
    ├── has many Vehicles
    └── has many Import Documents

## Planned Manufacturing Relationship

Vehicle Model
    └── has one Bill of Material

Bill of Material
    └── has many required Parts through BOM Items

Manufacturing Order
    ├── belongs to Vehicle Model
    ├── creates one or more Vehicles
    ├── has many Production Records
    └── has many Quality Inspections

