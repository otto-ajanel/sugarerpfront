import graphene
from graphene_sqlalchemy import SQLAlchemyObjectType
from app.core.models import Item  # Un modelo de SQLAlchemy como ejemplo

class ItemType(SQLAlchemyObjectType):
    class Meta:
        model = Item  # Define el modelo SQLAlchemy

class Query(graphene.ObjectType):
    items = graphene.List(ItemType)

    def resolve_items(self, info):
        return Item.query.all()

class Mutation(graphene.ObjectType):
    # Define las mutaciones aquí, por ejemplo para crear, actualizar o borrar items
    pass

schema = graphene.Schema(query=Query, mutation=Mutation)
