# Relationships

When creating a data model, it’s a good idea to organize different types of data into different collections — for example, storing _customers_ separate from _orders_. This means we need to create "connections" between data — otherwise, we wouldn’t know which customer placed a given order. These connections are called relationships, and they are the glue that connects data in a relational database.

There are multiple types of relationships but Directus only needs to store **one**: the Many-to-One (M2O). We'll see how this is possible later, but first let's review each relationship type.

## Many-to-One

A many-to-one (M2O) relationship exists when an item of **Collection A** is linked to one single item of **Collection B**, but an item of **Collection B** may be linked to many items of **Collection A**. For example, a movie has one director, but directors have many movies.

### Setup

This setup is specific to the `movies → directors` (M2O) field. The following steps assume you already have two collections: `movies` and `directors`. Each collection has the default `id` primary key and a `name` field.

::: v-pre
1. Go to **Settings > Collections & Fields > Movies**
2. Click **New Field**
3. Interface: Choose **Many-to-One**
4. Schema: **Name** your field (we're using `director`)
5. Relation: Select **Directors** as the Related Collection
6. Options: Enter a **Dropdown Template** (we're using `{{name}}`)
    * This can be any [MicroMustache](https://www.npmjs.com/package/micromustache) string containing field names available within `directors`
:::

:::tip Matching MySQL Datatype
In this example the `directors` collection uses the default `id` primary key, which has a Database DataType of `INT`. If you're using a different primary key type, such as `STRING`, make sure that your relational field's DataType/Length matches that of the primary key it will store. This can be adjusted under "Advanced Options" in the Field Modal.
:::

#### Screenshots

Here are some screenshots that show the above process in more detail.

<img src="../img/m2o/field.png" width="100">
<img src="../img/m2o/interface.png" width="100">
<img src="../img/m2o/name.png" width="100">
<img src="../img/m2o/relation.png" width="100">
<img src="../img/m2o/options.png" width="100">
<img src="../img/m2o/done.png" width="100">

## One-to-Many

A one-to-many (O2M) relationship exists when an item of **Collection A** may be linked to many items of **Collection B**, but an item of **Collection B** is linked to only one single item of **Collection A**. For example, directors have many movies, but a movie only has one director. As you can see, this is the _same relationship_ as the M2O above... but looking at it from the opposite direction.

### Setup

This setup is specific to the `directors → movies` (O2M) field. The following steps assume you already have two collections: `movies` and `directors`. Each collection has the default `id` primary key and a `name` field. Additionally, we're assuming you have already created the M2O relationship above, which creates the `movies.director` field.

::: v-pre
1. Go to **Settings > Collections & Fields > Directors**
2. Click **New Field**
3. Interface: Choose **One-to-Many**
4. Schema: **Name** your field (we're using `movies`)
5. Relation: Select **Movies** as the Related Collection and **Director** as the Related Field
    * The `movie.director` field was created during M2O setup above
:::

:::tip Alias Fields
Technically, this process does not create a new field, it remotely manages the relational data using the `movies.director` field. So if you were to look in the database you would not see an actual `directors.movies` column. That is why we call this an "alias", because it simply _represents_ a field.
:::

#### Screenshots

Here are some screenshots that show the above process in more detail.

<img src="../img/o2m/field.png" width="100">
<img src="../img/o2m/interface.png" width="100">
<img src="../img/o2m/name.png" width="100">
<img src="../img/o2m/relation.png" width="100">
<img src="../img/o2m/relation.png" width="100"> <!-- done -->

## Direction Matters

Now we understand that a M2O and O2M are the _exact_ same relationship... just viewed from opposite directions. The `movies` form shows a M2O dropdown to choose the director, and the `directors` form has a O2M listing to select their movies. But if you were to peek behind the scenes you would only see one entry in `directus_relations` defining this duplex relationship.

:::tip
An easy way to remember which side is which: the "many" is an actual column that stores the foreign key, while the "one" side is a simulated column using the `ALIAS` datatype.
:::

![O2M + M2O](../img/o2m-m2o.png)

## Many-to-Many

A many-to-many (M2M) is a slightly more advanced relationship that allows you to link _any_ items within **Collection A** and **Collection B**. For example, movies can have many genres, and genres can have many movies.

Technically this is not a new relationship type, it is a O2M and M2O _working together_ across a "junction" collection. Each item in the junction (eg: `movie_genres`) is a single link between one item in `movies` and one item in `genres`.

### Setup

This setup is specific to the `movies → genres` (M2M) field. The following steps assume you already have two collections: `movies` and `genres`. Each collection has the default `id` primary key and a `name` field.

::: v-pre
1. Go to **Settings > Collections & Fields**
2. Click **New Collection**
3. **Name** your junction collection (we're using `movie_genres`)
4. Set the junction collection to be _Hidden_ (Optional)
5. Click **New Field** — Add `movie_genres.movie` (basic numeric type)
6. Click **New Field** — Add `movie_genres.genre` (basic numeric type)
7. Go to **Settings > Collections & Fields > Movies**
8. Click **New Field**
9. Interface: Choose **Many-to-Many**
10. Schema: **Name** your field (we're using `genres`)
11. Relation: Select **Genres** as the Related Collection
    * Select **Movie Genres** as the Junction Collection
    * Map `movies.id` to **Movie** under the junction
    * Map `genres.id` to **Genre** under the junction
12. Options: **Visible Columns** sets the columns the interface shows (we're using `name`)
    * **Display Template** sets the columns the interface shows (we're using `{{name}}`)
:::

#### Screenshots

Here are some screenshots that show the above process in more detail.

<img src="../img/m2m/create_junction.png" width="100">
<img src="../img/m2m/junction.png" width="100">
<img src="../img/m2m/interface.png" width="100">
<img src="../img/m2m/relation.png" width="100">
<img src="../img/m2m/options.png" width="100">
<img src="../img/m2m/done.png" width="100">

![M2M](../img/m2m.png)

## Many-to-Any

The many-to-any (M2X) allows you to connect items within **Collection A** to many items from **any collection**. It is essentially the same as a M2M, but requires connected collections to use a Universally Unique Identifier (UUID) for the primary key. The Directus relational architecture supports this type of relationship, but there is no dedicated M2X interface yet.

This type of relationship goes by many different names, and is often referred to by its specific purpose. Some names include: matrix field, replicator, M2MM, M2X, M2N, etc.

![M2M](../img/m2mm.png)

## Translations

The translation interface is a standard O2M relation, but it expects a specific data model to ensure things work properly.

### Setup

TK