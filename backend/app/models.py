from app.database import Base
from sqlalchemy.orm import mapped_column, Mapped
from sqlalchemy.dialects.postgresql import JSONB
from sqlalchemy import String

class motorcycle(Base):
    __tablename__ = "motorcycles"
    
    id:Mapped[int] = mapped_column(primary_key=True)
    make:Mapped[str] = mapped_column(String(100), nullable=True, index=True)
    model:Mapped[str] = mapped_column(String(100), nullable=True, index=True)
    year:Mapped[str] = mapped_column(String(4), nullable=True, index=True)
    category:Mapped[str] = mapped_column(String(100), nullable=True)
    engine_type:Mapped[str] = mapped_column(String(100), nullable=True)
    displacement:Mapped[str] = mapped_column(String(100), nullable=True)
    horsepower:Mapped[str] = mapped_column(String(100), nullable=True)
    torque_nm:Mapped[str] = mapped_column(String(100), nullable=True)
    total_weight:Mapped[str] = mapped_column(String(100), nullable=True)
    total_height:Mapped[str] = mapped_column(String(100), nullable=True)
    total_width:Mapped[str] = mapped_column(String(100), nullable=True)
    total_length:Mapped[str] = mapped_column(String(100), nullable=True)
    seat_height:Mapped[str] = mapped_column(String(100), nullable=True)
    front_tire:Mapped[str] = mapped_column(String(100), nullable=True)
    rear_tire:Mapped[str] = mapped_column(String(100), nullable=True)
    front_brake:Mapped[str] = mapped_column(String(100), nullable=True)
    rear_brake:Mapped[str] = mapped_column(String(100), nullable=True)
    suspension:Mapped[str] = mapped_column(String(100), nullable=True)
    clutch:Mapped[str] = mapped_column(String(100), nullable=True)
    image_url:Mapped[str] = mapped_column(String, nullable=True)
    raw_data:Mapped[str] = mapped_column(JSONB, nullable=True) #left over data from original api call, stored as JSONB for future reference
   
    