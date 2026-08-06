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
