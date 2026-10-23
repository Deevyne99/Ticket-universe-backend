import mongoose from 'mongoose'
const { Schema } = mongoose

const EventSchema = new Schema(
  {
    // --- Core Info ---
    name: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String, // URL-friendly, e.g. "afrobeats-night-2026"
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    shortDescription: {
      type: String, // for card previews / listings
      maxlength: 200,
    },

    // --- Categorization ---
    tags: [
      {
        type: String,
        enum: [
          // Entertainment / Culture
          'music',
          'comedy',
          'theatre',
          'festival',
          'exhibition',

          // Sports
          'sports',

          // Professional / Business
          'conference',
          'workshop',
          'networking',
          'seminar',
          'trade_show',

          // Sector-specific
          'tech',
          'health',
          'agriculture',
          'education',
          'finance',
          'energy',
          'real_estate',
          'fashion',
          'food_and_drink',
          'religion',
          'government',
          'nonprofit_and_social_impact',

          // Fallback
          'other',
        ],
      },
    ],

    // --- Media ---
    flyer: {
      url: { type: String, required: true },
      publicId: String, // if using Cloudinary or similar, for deletion/updates
    },
    gallery: [
      {
        url: String,
        publicId: String,
      },
    ],

    // --- Pricing ---
    isFree: {
      type: Boolean,
      default: false,
    },
    ticketTiers: [
      {
        name: { type: String, required: true }, // e.g. "Regular", "VIP"
        price: { type: Number, required: true, min: 0 },
        currency: { type: String, default: 'NGN' },
        quantityAvailable: { type: Number, required: true },
        quantitySold: { type: Number, default: 0 },
        description: String,
      },
    ],

    // --- Format: Online / Physical / Hybrid ---
    format: {
      type: String,
      enum: ['physical', 'online', 'hybrid'],
      required: true,
      default: 'physical',
    },
    location: {
      venueName: String,
      address: String,
      city: String,
      state: String,
      country: { type: String, default: 'Nigeria' },
      coordinates: {
        lat: Number,
        lng: Number,
      },
    },
    onlineDetails: {
      platform: String, // e.g. "Zoom", "YouTube Live"
      joinLink: String, // reveal only after purchase, handled at query/controller level
    },

    // --- Date & Time ---
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    timezone: {
      type: String,
      default: 'Africa/Lagos',
    },

    // --- Seating ---
    hasSeating: {
      type: Boolean,
      default: false,
    },
    capacity: {
      type: Number,
    },

    // --- Organizer ---
    organizer: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },

    // --- Status ---
    status: {
      type: String,
      enum: ['draft', 'published', 'ongoing', 'completed', 'cancelled'],
      default: 'draft',
      index: true,
    },
  },
  {
    timestamps: true,
  },
)

export default mongoose.model('Event', EventSchema)
