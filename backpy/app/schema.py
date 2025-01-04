from pydantic import BaseModel

class UserBase(BaseModel):
    user_id: int
    user_email: str

    class Config:
        orm_mode = True
