from decimal import Decimal
from app.core.database import Base
from sqlalchemy.orm import mapped_column, Mapped
from sqlalchemy.dialects.postgresql import JSONB,NUMERIC
from sqlalchemy import Integer, String, UniqueConstraint


class Motorcycle(Base):
    __tablename__ = "motorcycles"
    __table_args__ = (
        UniqueConstraint('make', 'model', 'year', name='uq_motorcycle_make_model_year'),
    )
                
    
    id:Mapped[int] = mapped_column(primary_key=True)
    make:Mapped[str] = mapped_column(String(100), nullable=False, index=True)
    model:Mapped[str] = mapped_column(String(100), nullable=False, index=True)
    year:Mapped[str] = mapped_column(String(4), nullable=False, index=True)
    top_speed:Mapped[int|None] = mapped_column(Integer, nullable=True)  #parsed data #(horsepower, torque_nm, weight_kg, displacement)
    displacement:Mapped[Decimal|None] = mapped_column(NUMERIC, nullable= True)
    horsepower:Mapped[Decimal|None] = mapped_column(NUMERIC, nullable= True)
    torque_nm:Mapped[Decimal|None] = mapped_column(NUMERIC,nullable= True)
    weight_kg:Mapped[Decimal|None] = mapped_column(NUMERIC,nullable= True)
    image_url:Mapped[str|None] = mapped_column(String, nullable=True)
    raw_specs:Mapped[str] = mapped_column(JSONB, nullable=False) #left over data from original api call, stored as JSONB for future reference
    