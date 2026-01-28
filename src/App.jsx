import React, { useState } from 'react';
import { Search, ArrowRight, Sparkles } from 'lucide-react';

const ingredientsData = {
  ingredients: [
    {
      id: "butter",
      name: "Butter",
      category: "fat",
      substitutes: [
        {
          name: "Coconut oil",
          ratio: "1:1 (use same amount)",
          contexts: ["baking", "cooking"],
          quality: "excellent",
          dietaryTags: ["vegan", "dairy-free"],
          textureImpact: "Similar texture and moisture",
          flavorImpact: "Slight coconut flavor with unrefined",
          notes: "Use refined coconut oil for neutral flavor."
        }
      ]
    },
    {
      id: "eggs",
      name: "Eggs",
      category: "binding",
      substitutes: [
        {
          name: "Flax egg",
          ratio: "1 egg = 1 tbsp ground flaxseed + 3 tbsp water",
          contexts: ["baking"],
          quality: "excellent",
          dietaryTags: ["vegan"],
          textureImpact: "Slightly denser",
          flavorImpact: "Nutty, earthy flavor",
          notes: "Mix and let sit 5 minutes until gel-like."
        }
      ]
    },
    {
      id: "milk",
      name: "Milk",
      category: "liquid",
      substitutes: [
        {
          name: "Almond milk",
          ratio: "1:1 (use same amount)",
          contexts: ["baking", "cooking"],
          quality: "excellent",
          dietaryTags: ["vegan", "dairy-free"],
          textureImpact: "Slightly thinner",
          flavorImpact: "Mild almond flavor",
          notes: "Use unsweetened for savory dishes."
        }
      ]
    },
    {
      id: "all-purpose-flour",
      name: "All-purpose flour",
      category: "structure",
      substitutes: [
        {
          name: "Bread flour",
          ratio: "1:1 (use same amount)",
          contexts: ["baking"],
          quality: "good",
          dietaryTags: [],
          textureImpact: "Chewier, denser texture",
          flavorImpact: "Neutral",
          notes: "Good for bread, pizza, but makes cookies tougher."
        }
      ]
    },
    {
      id: "white-sugar",
      name: "White sugar",
      category: "sweetener",
      substitutes: [
        {
          name: "Brown sugar",
          ratio: "1:1 (use same amount)",
          contexts: ["baking", "cooking"],
          quality: "excellent",
          dietaryTags: [],
          textureImpact: "Moister, chewier",
          flavorImpact: "Molasses/caramel flavor",
          notes: "Creates chewier cookies and moister cakes."
        }
      ]
    },
    {
      id: "brown-sugar",
      name: "Brown sugar",
      category: "sweetener",
      substitutes: [
        {
          name: "White sugar + molasses",
          ratio: "1 cup = 1 cup white sugar + 1-2 tbsp molasses",
          contexts: ["baking", "cooking"],
          quality: "excellent",
          dietaryTags: [],
          textureImpact: "Identical to brown sugar",
          flavorImpact: "Same as brown sugar",
          notes: "Use 1 tbsp for light brown, 2 tbsp for dark brown."
        }
      ]
    },
    {
      id: "baking-powder",
      name: "Baking powder",
      category: "leavening",
      substitutes: [
        {
          name: "Baking soda + cream of tartar",
          ratio: "1 tsp = 0.25 tsp baking soda + 0.5 tsp cream of tartar",
          contexts: ["baking"],
          quality: "excellent",
          dietaryTags: [],
          textureImpact: "Identical",
          flavorImpact: "Neutral",
          notes: "This is what baking powder is made of."
        }
      ]
    },
    {
      id: "vanilla-extract",
      name: "Vanilla extract",
      category: "flavoring",
      substitutes: [
        {
          name: "Vanilla bean paste",
          ratio: "1:1 (use same amount)",
          contexts: ["baking", "cooking"],
          quality: "excellent",
          dietaryTags: [],
          textureImpact: "None",
          flavorImpact: "Stronger vanilla flavor",
          notes: "More expensive but superior flavor."
        }
      ]
    },
    {
      id: "heavy-cream",
      name: "Heavy cream",
      category: "dairy",
      substitutes: [
        {
          name: "Milk + butter",
          ratio: "1 cup = 0.75 cup milk + 0.25 cup melted butter",
          contexts: ["cooking", "baking"],
          quality: "good",
          dietaryTags: [],
          textureImpact: "Slightly less rich",
          flavorImpact: "Similar",
          notes: "Works for cooking. Won't whip like cream."
        }
      ]
    },
    {
      id: "sour-cream",
      name: "Sour cream",
      category: "dairy",
      substitutes: [
        {
          name: "Greek yogurt",
          ratio: "1:1 (use same amount)",
          contexts: ["baking", "cooking", "topping"],
          quality: "excellent",
          dietaryTags: [],
          textureImpact: "Similar thickness",
          flavorImpact: "Similar tanginess",
          notes: "Nearly identical. Use full-fat for best results."
        }
      ]
    },
    {
      id: "buttermilk",
      name: "Buttermilk",
      category: "dairy",
      substitutes: [
        {
          name: "Milk + lemon juice",
          ratio: "1 cup = 1 cup milk + 1 tbsp lemon juice",
          contexts: ["baking"],
          quality: "excellent",
          dietaryTags: [],
          textureImpact: "Identical",
          flavorImpact: "Identical tanginess",
          notes: "Let sit 5-10 minutes before using."
        }
      ]
    },
    {
      id: "vegetable-oil",
      name: "Vegetable oil",
      category: "fat",
      substitutes: [
        {
          name: "Canola oil",
          ratio: "1:1 (use same amount)",
          contexts: ["baking", "cooking", "frying"],
          quality: "excellent",
          dietaryTags: [],
          textureImpact: "Identical",
          flavorImpact: "Neutral",
          notes: "Interchangeable in all recipes."
        }
      ]
    },
    {
      id: "honey",
      name: "Honey",
      category: "sweetener",
      substitutes: [
        {
          name: "Maple syrup",
          ratio: "1:1 (use same amount)",
          contexts: ["baking", "cooking"],
          quality: "excellent",
          dietaryTags: ["vegan"],
          textureImpact: "Similar",
          flavorImpact: "Maple flavor",
          notes: "Same consistency and sweetness level."
        }
      ]
    },
    {
      id: "lemon-juice",
      name: "Lemon juice",
      category: "acid",
      substitutes: [
        {
          name: "Lime juice",
          ratio: "1:1 (use same amount)",
          contexts: ["baking", "cooking"],
          quality: "excellent",
          dietaryTags: [],
          textureImpact: "Identical",
          flavorImpact: "Lime flavor",
          notes: "Same acidity level. Works perfectly."
        }
      ]
    },
    {
      id: "mayonnaise",
      name: "Mayonnaise",
      category: "condiment",
      substitutes: [
        {
          name: "Greek yogurt",
          ratio: "1:1 (use same amount)",
          contexts: ["sandwiches", "salads"],
          quality: "excellent",
          dietaryTags: [],
          textureImpact: "Similar creaminess",
          flavorImpact: "Tangier",
          notes: "Healthier option."
        }
      ]
    },
    {
      id: "breadcrumbs",
      name: "Breadcrumbs",
      category: "coating",
      substitutes: [
        {
          name: "Panko breadcrumbs",
          ratio: "1:1 (use same amount)",
          contexts: ["coating", "topping"],
          quality: "excellent",
          dietaryTags: [],
          textureImpact: "Crunchier, lighter",
          flavorImpact: "Similar",
          notes: "Crispier coating."
        }
      ]
    },
    {
      id: "cornstarch",
      name: "Cornstarch",
      category: "thickener",
      substitutes: [
        {
          name: "All-purpose flour",
          ratio: "1 tbsp cornstarch = 2 tbsp flour",
          contexts: ["thickening sauces"],
          quality: "good",
          dietaryTags: [],
          textureImpact: "Less glossy",
          flavorImpact: "May have slight flour taste",
          notes: "Use double the amount."
        }
      ]
    },
    {
      id: "plain-yogurt",
      name: "Plain yogurt",
      category: "dairy",
      substitutes: [
        {
          name: "Sour cream",
          ratio: "1:1 (use same amount)",
          contexts: ["baking", "cooking"],
          quality: "excellent",
          dietaryTags: [],
          textureImpact: "Similar",
          flavorImpact: "Similar tanginess",
          notes: "Nearly identical."
        }
      ]
    },
    {
      id: "cream-cheese",
      name: "Cream cheese",
      category: "dairy",
      substitutes: [
        {
          name: "Mascarpone",
          ratio: "1:1 (use same amount)",
          contexts: ["baking", "frosting"],
          quality: "excellent",
          dietaryTags: [],
          textureImpact: "Smoother, creamier",
          flavorImpact: "Richer, less tangy",
          notes: "More expensive but luxurious."
        }
      ]
    },
    {
      id: "ricotta-cheese",
      name: "Ricotta cheese",
      category: "dairy",
      substitutes: [
        {
          name: "Cottage cheese",
          ratio: "1:1 (blend if needed)",
          contexts: ["cooking", "baking"],
          quality: "excellent",
          dietaryTags: [],
          textureImpact: "Similar when blended",
          flavorImpact: "Similar",
          notes: "Blend for lasagna."
        }
      ]
    },
    {
      id: "parmesan-cheese",
      name: "Parmesan cheese",
      category: "dairy",
      substitutes: [
        {
          name: "Pecorino Romano",
          ratio: "1:1 (use same amount)",
          contexts: ["cooking", "topping"],
          quality: "excellent",
          dietaryTags: [],
          textureImpact: "Similar",
          flavorImpact: "Saltier, sharper",
          notes: "Reduce salt in recipe."
        }
      ]
    },
    {
      id: "chicken-broth",
      name: "Chicken broth",
      category: "liquid",
      substitutes: [
        {
          name: "Vegetable broth",
          ratio: "1:1 (use same amount)",
          contexts: ["cooking"],
          quality: "good",
          dietaryTags: ["vegetarian", "vegan"],
          textureImpact: "Similar",
          flavorImpact: "Less savory",
          notes: "May want to add more seasoning."
        }
      ]
    },
    {
      id: "tomato-paste",
      name: "Tomato paste",
      category: "condiment",
      substitutes: [
        {
          name: "Tomato sauce (reduced)",
          ratio: "1 tbsp = 3 tbsp sauce (simmered)",
          contexts: ["cooking"],
          quality: "good",
          dietaryTags: [],
          textureImpact: "Similar after reduction",
          flavorImpact: "Similar",
          notes: "Simmer to reduce by 2/3."
        }
      ]
    },
    {
      id: "worcestershire-sauce",
      name: "Worcestershire sauce",
      category: "condiment",
      substitutes: [
        {
          name: "Soy sauce + vinegar + sugar",
          ratio: "1 tbsp = 1 tbsp soy + 1/4 tsp vinegar + pinch sugar",
          contexts: ["cooking"],
          quality: "good",
          dietaryTags: [],
          textureImpact: "Similar",
          flavorImpact: "Similar umami",
          notes: "Mix together."
        }
      ]
    },
    {
      id: "dijon-mustard",
      name: "Dijon mustard",
      category: "condiment",
      substitutes: [
        {
          name: "Whole grain mustard",
          ratio: "1:1 (use same amount)",
          contexts: ["cooking", "dressings"],
          quality: "excellent",
          dietaryTags: [],
          textureImpact: "Grainier",
          flavorImpact: "Similar",
          notes: "Seeds add texture."
        }
      ]
    },
    {
      id: "fresh-garlic",
      name: "Fresh garlic",
      category: "aromatics",
      substitutes: [
        {
          name: "Garlic powder",
          ratio: "1 clove = 1/8 tsp powder",
          contexts: ["cooking"],
          quality: "acceptable",
          dietaryTags: [],
          textureImpact: "No texture",
          flavorImpact: "Less pungent",
          notes: "Use sparingly."
        }
      ]
    },
    {
      id: "fresh-ginger",
      name: "Fresh ginger",
      category: "aromatics",
      substitutes: [
        {
          name: "Ground ginger",
          ratio: "1 tbsp fresh = 1/4 tsp ground",
          contexts: ["cooking", "baking"],
          quality: "acceptable",
          dietaryTags: [],
          textureImpact: "No texture",
          flavorImpact: "More concentrated",
          notes: "Much stronger. Start with less."
        }
      ]
    },
    {
      id: "fresh-herbs",
      name: "Fresh herbs",
      category: "herbs",
      substitutes: [
        {
          name: "Dried herbs",
          ratio: "1 tbsp fresh = 1 tsp dried",
          contexts: ["cooking"],
          quality: "acceptable",
          dietaryTags: [],
          textureImpact: "No texture",
          flavorImpact: "More concentrated",
          notes: "Use 1/3 the amount."
        }
      ]
    },
    {
      id: "cooking-wine",
      name: "Cooking wine",
      category: "liquid",
      substitutes: [
        {
          name: "Broth + vinegar",
          ratio: "1 cup wine = 1 cup broth + 1 tbsp vinegar",
          contexts: ["cooking"],
          quality: "good",
          dietaryTags: [],
          textureImpact: "Similar",
          flavorImpact: "Less complex",
          notes: "Broth adds body, acid adds brightness."
        }
      ]
    }
  ]
};

const App = () => {
  const [selectedIngredient, setSelectedIngredient] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDietary, setSelectedDietary] = useState([]);

  const allDietaryTags = [...new Set(
    ingredientsData.ingredients.flatMap(ing => 
      ing.substitutes.flatMap(sub => sub.dietaryTags)
    )
  )].filter(Boolean);

  const filteredIngredients = ingredientsData.ingredients.filter(ing =>
    ing.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getQualityColor = (quality) => {
    switch(quality) {
      case 'excellent': return 'text-emerald-700 bg-emerald-50 border-emerald-200';
      case 'good': return 'text-blue-700 bg-blue-50 border-blue-200';
      case 'acceptable': return 'text-amber-700 bg-amber-50 border-amber-200';
      default: return 'text-gray-700 bg-gray-50 border-gray-200';
    }
  };

  const filteredSubstitutes = selectedIngredient 
    ? selectedIngredient.substitutes.filter(sub => 
        selectedDietary.length === 0 || 
        selectedDietary.some(diet => sub.dietaryTags.includes(diet))
      )
    : [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        <div className="text-center mb-8 sm:mb-12 pt-4 sm:pt-8">
          <div className="inline-flex items-center justify-center gap-2 sm:gap-4 mb-3 sm:mb-4">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="text-3xl sm:text-4xl font-black text-slate-800">This</div>
              <div className="flex flex-col gap-0.5 sm:gap-1">
                <ArrowRight className="w-6 h-6 sm:w-8 sm:h-8 text-emerald-500" />
                <ArrowRight className="w-6 h-6 sm:w-8 sm:h-8 text-emerald-500 transform rotate-180" />
              </div>
              <div className="text-3xl sm:text-4xl font-black text-slate-800">That</div>
            </div>
          </div>
          <p className="text-base sm:text-xl text-slate-600 font-medium px-4">Out of something? We've got you covered.</p>
        </div>

        <div className="mb-6 sm:mb-10 max-w-2xl mx-auto px-4 sm:px-0">
          <div className="relative group">
            <Search className="absolute left-4 sm:left-5 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5 group-focus-within:text-emerald-500 transition-colors" />
            <input
              type="text"
              placeholder="What are you missing?"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 sm:pl-14 pr-4 sm:pr-6 py-3 sm:py-4 bg-white border-2 border-slate-200 rounded-2xl focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 focus:outline-none text-base sm:text-lg transition-all shadow-sm hover:shadow-md"
            />
          </div>
        </div>

        {!selectedIngredient && (
          <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-4 sm:p-8">
            <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-slate-800">Select an ingredient</h2>
            {filteredIngredients.length === 0 ? (
              <div className="text-center py-16">
                <div className="text-7xl mb-6">🤔</div>
                <h3 className="text-2xl font-bold text-slate-800 mb-3">Nothing found</h3>
                <p className="text-slate-500 mb-6 text-lg">We don't have {searchTerm} yet</p>
                <button
                  onClick={() => setSearchTerm('')}
                  className="px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl font-semibold transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  Clear search
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {filteredIngredients.map((ingredient) => (
                  <button
                    key={ingredient.id}
                    onClick={() => setSelectedIngredient(ingredient)}
                    className="group p-5 bg-gradient-to-br from-slate-50 to-white hover:from-emerald-50 hover:to-teal-50 rounded-2xl border-2 border-slate-200 hover:border-emerald-300 transition-all duration-200 text-left shadow-sm hover:shadow-lg transform hover:-translate-y-1"
                  >
                    <div className="font-bold text-slate-800 mb-1 group-hover:text-emerald-700 transition-colors">{ingredient.name}</div>
                    <div className="text-xs text-slate-500 capitalize font-medium">{ingredient.category}</div>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {selectedIngredient && (
          <div className="space-y-6">
            <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-4 sm:p-8">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="bg-gradient-to-br from-emerald-500 to-teal-600 text-white p-2 sm:p-3 rounded-2xl flex-shrink-0">
                    <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <div>
                    <h2 className="text-2xl sm:text-3xl font-black text-slate-800">Instead of {selectedIngredient.name}</h2>
                    <p className="text-slate-500 capitalize font-medium mt-1 text-sm sm:text-base">{selectedIngredient.category}</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedIngredient(null)}
                  className="px-4 sm:px-5 py-2 sm:py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-semibold transition-all text-sm sm:text-base w-full sm:w-auto"
                >
                  ← Back
                </button>
              </div>

              {allDietaryTags.length > 0 && (
                <div>
                  <p className="text-sm font-semibold text-slate-600 mb-3">Filter by diet</p>
                  <div className="flex flex-wrap gap-2">
                    {allDietaryTags.map((tag) => (
                      <button
                        key={tag}
                        onClick={() => {
                          setSelectedDietary(prev =>
                            prev.includes(tag)
                              ? prev.filter(t => t !== tag)
                              : [...prev, tag]
                          );
                        }}
                        className={`px-4 py-2 rounded-xl text-sm font-bold transition-all transform hover:scale-105 ${
                          selectedDietary.includes(tag)
                            ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg'
                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        }`}
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-5">
              {filteredSubstitutes.length === 0 ? (
                <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-12 text-center">
                  <div className="text-6xl mb-4">🔍</div>
                  <p className="text-xl text-slate-600 font-medium">No matches for your filters</p>
                  <p className="text-slate-500 mt-2">Try removing some dietary preferences</p>
                </div>
              ) : (
                filteredSubstitutes.map((substitute, idx) => (
                  <div key={idx} className="bg-white rounded-3xl shadow-lg border border-slate-200 p-4 sm:p-8 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                    <div className="flex flex-col sm:flex-row items-start justify-between gap-4 mb-5">
                      <div className="w-full sm:w-auto">
                        <h3 className="text-xl sm:text-2xl font-black text-slate-800 mb-2">{substitute.name}</h3>
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className={`px-3 sm:px-4 py-1.5 rounded-lg text-xs sm:text-sm font-bold border-2 ${getQualityColor(substitute.quality)}`}>
                            {substitute.quality}
                          </span>
                          {substitute.dietaryTags.map((tag, i) => (
                            <span key={i} className="px-2 sm:px-3 py-1.5 bg-gradient-to-r from-teal-100 to-emerald-100 text-emerald-700 rounded-lg text-xs font-bold">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="w-full sm:w-auto bg-gradient-to-br from-emerald-50 to-teal-50 px-4 sm:px-5 py-3 rounded-xl border-2 border-emerald-200">
                        <div className="text-xs font-bold text-emerald-600 uppercase tracking-wide mb-1">Ratio</div>
                        <div className="text-sm font-black text-emerald-700">{substitute.ratio}</div>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-5 mb-5">
                      <div className="bg-slate-50 p-4 rounded-xl">
                        <div className="text-sm font-bold text-slate-700 mb-2 flex items-center gap-2">
                          <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                          Texture
                        </div>
                        <div className="text-sm text-slate-600">{substitute.textureImpact}</div>
                      </div>
                      <div className="bg-slate-50 p-4 rounded-xl">
                        <div className="text-sm font-bold text-slate-700 mb-2 flex items-center gap-2">
                          <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                          Flavor
                        </div>
                        <div className="text-sm text-slate-600">{substitute.flavorImpact}</div>
                      </div>
                    </div>

                    <div className="mb-5">
                      <div className="text-sm font-bold text-slate-700 mb-2">Best for</div>
                      <div className="flex flex-wrap gap-2">
                        {substitute.contexts.map((context, i) => (
                          <span key={i} className="px-3 py-1.5 bg-slate-100 text-slate-700 rounded-lg text-xs font-semibold">
                            {context}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-5 rounded-xl border-2 border-blue-100">
                      <div className="flex items-start gap-3">
                        <Sparkles className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                        <div className="text-sm text-slate-700 font-medium leading-relaxed">{substitute.notes}</div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;