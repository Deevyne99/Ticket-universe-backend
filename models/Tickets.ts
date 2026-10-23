import mongoose from 'mongoose'
const { Schema } = mongoose

const TicketSchema = new Schema(
  {
    // --- References ---
    event: {
      type: Schema.Types.ObjectId,
      ref: 'Event',
      required: true,
      index: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },

    // --- Ticket Tier (references Event.ticketTiers, with a snapshot) ---
    ticketTierId: {
      type: Schema.Types.ObjectId, // matches the _id of the subdocument in Event.ticketTiers
    },
    tierNameSnapshot: {
      type: String, // e.g. "VIP" — kept even if the tier is renamed/removed later
    },

    // --- Ticket Identification ---
    ticketNumber: {
      type: String, // human-readable, e.g. "TU-2026-000123"
      required: true,
      unique: true,
    },
    qrCodeHash: {
      type: String,
      required: true,
      unique: true,
    },

    // --- Seat (optional — only used when event.hasSeating is true) ---
    seat: {
      type: {
        section: String,
        row: String,
        number: String,
      },
      default: undefined, // avoids empty {} on events without seating
    },

    // --- Pricing Snapshot (price at time of purchase, not live from Event) ---
    price: {
      amount: {
        type: Number,
        required: true,
        min: 0,
      },
      currency: {
        type: String,
        default: 'NGN',
      },
    },

    // --- Purchase / Payment Info ---
    orderReference: {
      type: String, // links to your Order/Payment model or gateway reference
      required: true,
    },
    paymentStatus: {
      type: String,
      enum: ['pending', 'paid', 'failed', 'refunded'],
      default: 'pending',
      index: true,
    },

    // --- Ticket Lifecycle Status ---
    status: {
      type: String,
      enum: ['active', 'used', 'cancelled', 'refunded', 'expired'],
      default: 'active',
      index: true,
    },
    isCheckedIn: {
      type: Boolean,
      default: false,
    },
    checkedInAt: {
      type: Date,
    },
    checkedInBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },

    // --- Transfer (optional, if gifting/reselling is allowed) ---
    isTransferable: {
      type: Boolean,
      default: true,
    },
    transferHistory: [
      {
        fromUser: { type: Schema.Types.ObjectId, ref: 'User' },
        toUser: { type: Schema.Types.ObjectId, ref: 'User' },
        transferredAt: { type: Date, default: Date.now },
      },
    ],

    // --- Attendee Info ---
    attendeeName: {
      type: String,
      trim: true,
    },
    attendeeEmail: {
      type: String,
      trim: true,
      lowercase: true,
    },
  },
  {
    timestamps: true,
  },
)

export default mongoose.model('Ticket', TicketSchema)
