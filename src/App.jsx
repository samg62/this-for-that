import React, { useState, useEffect } from 'react';
import { Search, ArrowRight, Sparkles } from 'lucide-react';
import { Analytics } from '@vercel/analytics/react';

const App = () => {
  const [selectedIngredient, setSelectedIngredient] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [ingredientsData, setIngredientsData] = useState({ ingredients: [] });
  const [loading, setLoading] = useState(true);

  // Load ingredients from JSON file
  useEffect(() => {
    fetch('/ingredients.json')
      .then(res => res.json())
      .then(data => {
        setIngredientsData(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to load ingredients:', err);
        setLoading(false);
      });
  }, []);

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

  const getQualityLabel = (quality) => {
    switch(quality) {
      case 'excellent': return 'Excellent match - works like the original';
      case 'good': return 'Good substitute - minor differences';
      case 'acceptable': return 'Acceptable - works in a pinch';
      default: return quality;
    }
  };

  const filteredSubstitutes = selectedIngredient 
    ? selectedIngredient.substitutes
    : [];

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 flex items-center justify-center">
        <div className="text-xl text-slate-600">Loading ingredients...</div>
      </div>
    );
  }

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
            </div>

            <div className="space-y-5">
              {filteredSubstitutes.length === 0 ? (
                <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-12 text-center">
                  <div className="text-6xl mb-4">🔍</div>
                  <p className="text-xl text-slate-600 font-medium">No substitutes available</p>
                </div>
              ) : (
                filteredSubstitutes.map((substitute, idx) => (
                  <div key={idx} className="bg-white rounded-3xl shadow-lg border border-slate-200 p-4 sm:p-8 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                    <div className="flex flex-col sm:flex-row items-start justify-between gap-4 mb-5">
                      <div className="w-full sm:w-auto">
                        <h3 className="text-xl sm:text-2xl font-black text-slate-800 mb-2">{substitute.name}</h3>
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className={`px-3 sm:px-4 py-1.5 rounded-lg text-xs sm:text-sm font-bold border-2 ${getQualityColor(substitute.quality)}`}>
                            {getQualityLabel(substitute.quality)}
                          </span>
                          {substitute.dietaryTags && substitute.dietaryTags.map((tag, i) => (
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

                    {substitute.textureImpact && substitute.flavorImpact && (
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
                    )}

                    {substitute.contexts && substitute.contexts.length > 0 && (
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
                    )}

                    {substitute.notes && (
                      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-5 rounded-xl border-2 border-blue-100">
                        <div className="flex items-start gap-3">
                          <Sparkles className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                          <div className="text-sm text-slate-700 font-medium leading-relaxed">{substitute.notes}</div>
                        </div>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>
      <Analytics />
    </div>
  );
};

export default App;

