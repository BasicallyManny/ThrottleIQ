from decimal import Decimal
import enum
from app.core.database import Base
from sqlalchemy.orm import mapped_column, Mapped, relationship
from sqlalchemy.dialects.postgresql import JSONB,NUMERIC
from sqlalchemy import Boolean, DateTime, ForeignKey, Integer, Numeric, String, UniqueConstraint,Enum


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
    
class SeverityEnum(str,enum.Enum):
    FATAL="Fatal"
    INJURY="Injury"
    PROPERTY_DAMAGE="Property Damage"
    
class CrashVechicle(Base):
    __tablename__="crash_vechicle"
    
    id: Mapped[int] = mapped_column(primary_key=True)
    collision_id:Mapped[int] = mapped_column(ForeignKey("crashes.collision_id"), nullable=True,index=True)
    vehicle_number: Mapped[int] = mapped_column(Integer, nullable=False)
    vehicle_type: Mapped[str | None] = mapped_column(String, nullable=True)
    contributing_factor: Mapped[str | None] = mapped_column(String, nullable=True)

    crash: Mapped["Crash"] = relationship(back_populates="vechicles")
    
    
class Crash(Base):
    __tablename__="crashes"
    
    collision_id: Mapped[int] = mapped_column(primary_key=True)
    crash_datetime: Mapped[object | None] = mapped_column(DateTime(timezone=True), nullable=True, index=True)
    latitude: Mapped[float] = mapped_column(Numeric, nullable=False)
    longitude: Mapped[float] = mapped_column(Numeric, nullable=False)
    borough: Mapped[str | None] = mapped_column(String, nullable=True, index=True)
    zip_code: Mapped[str | None] = mapped_column(String, nullable=True)
    on_street_name: Mapped[str | None] = mapped_column(String, nullable=True)
    cross_street_name: Mapped[str | None] = mapped_column(String, nullable=True)
    off_street_name: Mapped[str | None] = mapped_column(String, nullable=True)
    motorcycle_involved: Mapped[bool | None] = mapped_column(Boolean, nullable=True, index=True)
    severity: Mapped[SeverityEnum] = mapped_column(Enum(SeverityEnum), nullable=False, index=True)
    persons_injured: Mapped[int | None] = mapped_column(Integer, nullable=True)
    persons_killed: Mapped[int | None] = mapped_column(Integer, nullable=True)
    
    vechicles: Mapped[list["CrashVechicle"]] = relationship(back_populates="crash")
    