from app.database import Base
from sqlalchemy.orm import mapped_column, Mapped
from sqlalchemy.dialects.postgresql import JSONB
from sqlalchemy import Integer, String, UniqueConstraint


class motorcycle(Base):
    __tablename__ = "motorcycles"
    __table_args__ = (
        UniqueConstraint('make', 'model', 'year', name='uq_motorcycle_make_model_year'),
    )
                
    
    id:Mapped[int] = mapped_column(primary_key=True)
    make:Mapped[str] = mapped_column(String(100), nullable=False, index=True)
    model:Mapped[str] = mapped_column(String(100), nullable=False, index=True)
    year:Mapped[str] = mapped_column(String(4), nullable=False, index=True)
    category:Mapped[str] = mapped_column(String(100), nullable=True, index=True)
    top_speed:Mapped[int] = mapped_column(Integer, nullable=True)
    image_url:Mapped[str] = mapped_column(String, nullable=True)
    raw_specs:Mapped[str] = mapped_column(JSONB, nullable=False) #left over data from original api call, stored as JSONB for future reference
    