from app.core.models import Item

class ItemRepository:
    def get_all(self):
        return Item.query.all()

    def get_by_id(self, item_id):
        return Item.query.filter_by(id=item_id).first()
