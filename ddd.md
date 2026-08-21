# Domain-Driven Design (DDD)

## Agrégat (Aggregate)

Un **agrégat** est une **unité transactionnelle** : un ensemble d'entités qui doivent être traitées de manière cohérente pour réaliser une action métier.

### Objectifs

- Garantir la cohérence des données.
- Faire respecter les **invariants métier** (règles qui doivent toujours être vraies).
- Définir les limites d'une transaction.

### Repository

Seule la **racine de l'agrégat (Aggregate Root)** possède un repository.

Toutes les modifications des entités appartenant à un agrégat doivent passer par cette racine afin de garantir la cohérence de l'ensemble.

### Agrégats vs Base de données

Les relations entre les entités en base de données garantissent l'intégrité référentielle.

Les agrégats, eux, définissent les **frontières métier** :
- ils déterminent ce qui doit être modifié dans une même transaction ;
- ils permettent de découpler le modèle métier du modèle relationnel de la base de données.

### Relations

#### Entre deux agrégats

Les références se font **par identifiant (ID)**.

```text
Commande
 └── customerId
```

#### À l'intérieur d'un agrégat

Les références se font **par objet**.

```text
Commande
 ├── LigneCommande
 ├── LigneCommande
 └── AdresseLivraison
```

---

## Bounded Context

Un **Bounded Context** est un périmètre métier dans lequel un même langage est utilisé.

À l'intérieur d'un Bounded Context :

- une entité possède une seule signification ;
- les règles métier sont cohérentes ;
- le vocabulaire est partagé par tous les acteurs.

Entre deux Bounded Contexts, un même terme peut avoir des significations différentes.

### Exemple

Dans un site e-commerce :

- **Contexte Catalogue**
  - Produit
  - Catégorie
  - Prix public

- **Contexte Stock**
  - Produit
  - Quantité disponible
  - Entrepôt

- **Contexte Facturation**
  - Client
  - Facture
  - Paiement

Le mot **Produit** existe dans plusieurs contextes, mais ne représente pas forcément les mêmes informations.

---

## Règles à retenir

### Agrégat

- Une transaction = un agrégat.
- Un repository par Aggregate Root.
- Les objets d'un même agrégat se référencent directement.
- Les autres agrégats sont référencés uniquement par leur ID.

### Bounded Context

- Un contexte = un langage métier unique.
- Les modèles sont indépendants entre les contextes.
- Les échanges entre contextes se font explicitement (événements, API, messages...).



----------------------------------------------------------------------

# 📚 Domain-Driven Design (DDD) - Fiche de révision

> Le DDD (Domain-Driven Design) consiste à modéliser le logiciel autour du métier plutôt qu'autour de la base de données.

---

# Les briques du DDD

```text
                    Domaine Métier
                          │
              ┌───────────┴───────────┐
              │                       │
      Bounded Context         Bounded Context
              │                       │
         Agrégats                Agrégats
              │
    ┌─────────┴─────────┐
    │                   │
 Aggregate Root     Entités
    │                   │
    └────── Value Objects
```

---

# 1. Bounded Context

## Définition

Un **Bounded Context** est un périmètre métier dans lequel un langage est partagé par tous.

Autrement dit :

- les mêmes mots ont la même signification ;
- les mêmes règles métier s'appliquent ;
- le modèle est cohérent.

Chaque Bounded Context possède généralement :

- ses entités ;
- ses agrégats ;
- ses services métier ;
- ses repositories.

---

## Exemple

```text
                 Application E-commerce

      ┌───────────────────────────────────────┐
      │ Catalogue                             │
      │---------------------------------------│
      │ Produit                               │
      │ Catégorie                             │
      │ Prix affiché                          │
      └───────────────────────────────────────┘

                    ↓ API / Events

      ┌───────────────────────────────────────┐
      │ Stock                                 │
      │---------------------------------------│
      │ Produit                               │
      │ Quantité                              │
      │ Entrepôt                              │
      └───────────────────────────────────────┘

                    ↓ API / Events

      ┌───────────────────────────────────────┐
      │ Facturation                           │
      │---------------------------------------│
      │ Client                                │
      │ Facture                               │
      │ Paiement                              │
      └───────────────────────────────────────┘
```

👉 Le mot **Produit** existe dans plusieurs contextes mais ne représente pas forcément les mêmes informations.

---

# 2. Entité

Une entité possède :

- une identité (ID) ;
- un cycle de vie ;
- un état qui peut évoluer.

Exemple :

```text
Client

id = 15
nom = Martin
email = ...
```

Même si son nom change, c'est toujours le même client.

---

# 3. Value Object

Un Value Object :

- ne possède pas d'identité ;
- est immutable ;
- est défini uniquement par ses valeurs.

Exemple :

```text
Adresse

Rue
Code postal
Ville
Pays
```

Deux adresses identiques sont considérées comme égales.

---

# 4. Agrégat (Aggregate)

## Définition

Un agrégat est une **frontière de cohérence métier**.

Toutes les données à l'intérieur doivent rester cohérentes après chaque transaction.

```text
             Aggregate

        Commande
             │
     ┌───────┴────────┐
     │                │
 LigneCommande   AdresseLivraison
```

Tout est enregistré dans une seule transaction.

---

## Pourquoi ?

Pour protéger les règles métier.

Exemple :

Une commande :

- doit avoir au moins une ligne ;
- le total doit être correct ;
- une ligne ne peut pas avoir une quantité négative.

Toutes ces règles sont vérifiées par l'agrégat.

Ces règles sont appelées **invariants**.

---

# 5. Aggregate Root

Chaque agrégat possède une racine.

```text
Commande
│
├── LigneCommande
├── LigneCommande
└── AdresseLivraison
```

La racine est le seul point d'entrée.

On ne modifie jamais directement :

- LigneCommande
- AdresseLivraison

On passe toujours par :

```text
Commande
```

---

# 6. Repository

Un repository existe uniquement pour la racine de l'agrégat.

```text
CommandeRepository

save(Commande)

findById(...)
```

On ne crée jamais :

```text
LigneCommandeRepository ❌

AdresseRepository ❌
```

car ces objets appartiennent déjà à l'agrégat.

---

# 7. Les références

## À l'intérieur d'un agrégat

Les objets se référencent directement.

```text
Commande

 ├── LigneCommande
 ├── LigneCommande
 └── AdresseLivraison
```

---

## Entre deux agrégats

On référence uniquement l'ID.

```text
Commande

customerId
```

et non

```text
Commande

Customer
```

Pourquoi ?

Pour éviter :

- les grosses transactions ;
- le couplage ;
- les dépendances fortes.

---

# 8. Transaction

Une transaction ne traverse jamais plusieurs agrégats.

```text
             Transaction

Commande
    │
    ▼
CommandeRepository.save()

✔ OK
```

En revanche :

```text
Commande
        │
        ▼
Client
        │
        ▼
Stock
```

❌ plusieurs agrégats dans une même transaction.

Dans ce cas, on utilise généralement :

- des Domain Events ;
- de la messagerie ;
- des traitements asynchrones.

---

# 9. Domain Event

Un événement métier indique qu'un fait important vient de se produire.

Exemple :

```text
CommandeValidée
```

Le contexte Stock peut écouter :

```text
CommandeValidée
```

pour décrémenter le stock.

Le contexte Facturation peut écouter :

```text
CommandeValidée
```

pour générer une facture.

Chaque contexte reste indépendant.

---

# Résumé

```text
Bounded Context
      │
      ├── Agrégat
      │      │
      │      ├── Aggregate Root
      │      ├── Entités
      │      └── Value Objects
      │
      ├── Repository
      │
      └── Domain Services
```

---

# Les règles d'or

## Bounded Context

✔ Un langage métier unique.

✔ Les modèles sont indépendants.

✔ Les échanges passent par des API ou des événements.

---

## Agrégat

✔ Une transaction = un agrégat.

✔ Une Aggregate Root.

✔ Un Repository.

✔ Les invariants sont protégés.

✔ Les autres agrégats sont référencés par leur ID.

---

# À retenir

Le DDD ne cherche pas à modéliser la base de données.

Il cherche à modéliser **le métier**, en définissant des frontières de cohérence (les agrégats) à l'intérieur de contextes métier cohérents (les Bounded Contexts).

Le DDD split le domaine métier de la persistence via des aggregats et des mappers faisant le lien entre entites et aggregats. Dans notre cas pour plus de commodité dans la migration les aggregats seront les entités.
