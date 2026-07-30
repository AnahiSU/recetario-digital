import { useState } from "react";
import { Link } from "react-router-dom";
import { FiChevronLeft, FiChevronDown, FiCoffee } from "react-icons/fi";
import MealSlot, { type Meal } from "../components/MealSlot";
import weekMenuData from "../mocks/weekMenu.json" with { type: "json" };

interface DayMenu {
    day: string;
    name: string;
    desayuno: Meal | null;
    almuerzo: Meal | null;
    cena: Meal | null;
}

type MealType = "desayuno" | "almuerzo" | "cena";
function MenuSemanal() {
    const [days, setDays] = useState<DayMenu[]>(weekMenuData.days as DayMenu[]);
    const [expandedIndex, setExpandedIndex] = useState<number>(0);
    function handleSelectDay(index: number) {
        setExpandedIndex(index);
    }
    function toggleAccordion(index: number) {
        setExpandedIndex((current) => (current === index ? -1 : index));
    }
    function setMeal(dayIndex: number, mealType: MealType, meal: Meal | null) {
        setDays((prevDays) =>
            prevDays.map((day, index) =>
                index === dayIndex ? { ...day, [mealType]: meal } : day
            )
        );
    }
    return (
        <div className="p-8 mx-auto w-full max-w-7xl font-poppins">
            <div className="mb-2">
                <Link
                    to="/menu-semanal"
                    className="inline-flex items-center gap-2 text-2xl font-medium text-slate-800 hover:text-sage-green transition-colors w-fit"
                >
                    <FiChevronLeft className="text-3xl" />
                    Menu semanal
                </Link>
            </div>
            <p className="text-slate-500 mb-6 ml-1">{weekMenuData.weekLabel}</p>
            <div className="flex gap-2 mb-8">
                {days.map((day, index) => (
                    <button
                        key={index}
                        onClick={() => handleSelectDay(index)}
                        className={`w-9 h-9 rounded-md border text-sm font-medium transition-colors ${
                            expandedIndex === index
                                ? "bg-slate-blue text-white border-slate-blue"
                                : "bg-white text-slate-700 border-slate-300 hover:border-slate-blue"
                        }`}
                    >
                        {day.day}
                    </button>
                ))}
            </div>
            <div className="flex flex-col gap-4">
                {days.map((day, index) => {
                    const isOpen = expandedIndex === index;
                    const isEmptyDay = !day.desayuno && !day.almuerzo && !day.cena;

                    return (
                        <div
                            key={index}
                            className="border border-slate-300 rounded-md overflow-hidden bg-cream/40"
                        >
                            <button
                                onClick={() => toggleAccordion(index)}
                                className="w-full flex items-center justify-between px-6 py-4 bg-cream hover:bg-cream/70 transition-colors"
                            >
                                <span className="text-xl text-slate-800">{day.name}</span>
                                <FiChevronDown
                                    className={`text-slate-600 transition-transform ${
                                        isOpen ? "rotate-180" : ""
                                    }`}
                                />
                            </button>

                            {isOpen && (
                                <div className="border-t border-slate-300 bg-white">
                                    {isEmptyDay && (
                                        <div className="flex flex-col items-center gap-2 pt-8 pb-2 text-slate-400">
                                            <FiCoffee size={28} />
                                            <p className="text-slate-500">
                                                Sin recetas esta semana
                                            </p>
                                            <p className="text-xs text-slate-400 max-w-xs text-center">
                                                Agrega una receta a Desayuno, Almuerzo o Cena
                                                para planificar este día.
                                            </p>
                                        </div>
                                    )}
                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 px-6 py-8">
                                        <MealSlot
                                            label="Desayuno"
                                            meal={day.desayuno}
                                            onSelect={(meal) => setMeal(index, "desayuno", meal)}
                                            onRemove={() => setMeal(index, "desayuno", null)}
                                        />
                                        <MealSlot
                                            label="Almuerzo"
                                            meal={day.almuerzo}
                                            onSelect={(meal) => setMeal(index, "almuerzo", meal)}
                                            onRemove={() => setMeal(index, "almuerzo", null)}
                                        />
                                        <MealSlot
                                            label="Cena"
                                            meal={day.cena}
                                            onSelect={(meal) => setMeal(index, "cena", meal)}
                                            onRemove={() => setMeal(index, "cena", null)}
                                        />
                                    </div>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default MenuSemanal;
