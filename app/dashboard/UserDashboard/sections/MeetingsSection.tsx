"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabaseClient"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Video, Check, XCircle, Calendar, Clock } from "lucide-react"
import type { Meeting } from "../types"

interface MeetingsSectionProps {
  userId?: string
  meetings: Meeting[]
  onCreated: (meeting: Meeting) => void
}

export default function MeetingsSection({ userId, meetings, onCreated }: MeetingsSectionProps) {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [date, setDate] = useState("") // YYYY-MM-DD
  const [time, setTime] = useState("") // HH:mm
  const [duration, setDuration] = useState<number>(30)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string>("")
  const [success, setSuccess] = useState<string>("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccess("")

    if (!userId) {
      setError("You must be logged in to request a meeting.")
      return
    }
    if (!title.trim() || !date || !time) {
      setError("Please provide title, date and time.")
      return
    }

    setSubmitting(true)
    try {
      const payload = {
        user_id: userId,
        title: title.trim(),
        description: description.trim(),
        meeting_date: date, // e.g. 2025-01-20
        meeting_time: time, // e.g. 14:30
        duration: Number(duration) || 30,
        status: "pending" as const,
      }

      const { data, error } = await supabase
        .from("meetings")
        .insert(payload)
        .select("*")
        .single()

      if (error) throw error

      // Build Meeting with expected nested user shape for consistency
      const created: Meeting = {
        ...(data as any),
        user: undefined,
      }

      onCreated(created)
      setSuccess("Meeting request submitted. We'll confirm shortly.")
      setTitle("")
      setDescription("")
      setDate("")
      setTime("")
      setDuration(30)
    } catch (err: any) {
      setError(err.message || "Failed to submit meeting request.")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Video className="w-5 h-5 text-orange-600" /> Request a Meeting
        </h3>

        {error && (
          <div className="mb-4 p-3 rounded bg-red-50 text-red-700 text-sm">{error}</div>
        )}
        {success && (
          <div className="mb-4 p-3 rounded bg-green-50 text-green-700 text-sm">{success}</div>
        )}

        <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Quarterly FX strategy discussion"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              required
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Description (optional)</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              placeholder="Share agenda or context so we can prepare"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Duration (minutes)</label>
            <input
              type="number"
              min={15}
              step={15}
              value={duration}
              onChange={(e) => setDuration(Number(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>

          <div className="md:col-span-2">
            <Button type="submit" disabled={submitting} className="bg-orange-500 hover:bg-orange-600 text-white">
              {submitting ? "Submitting..." : "Submit Request"}
            </Button>
          </div>
        </form>
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Your Meeting Requests</h3>
        {meetings.length === 0 ? (
          <div className="text-center py-8 text-gray-600">No meeting requests yet</div>
        ) : (
          <div className="space-y-3">
            {meetings.map((meeting) => (
              <div key={meeting.id} className="p-4 border rounded-lg bg-gray-50">
                <div className="flex items-center justify-between gap-3 flex-wrap">
                  <div className="min-w-0">
                    <div className="font-semibold text-gray-900 truncate">{meeting.title}</div>
                    <div className="text-xs text-gray-600 flex items-center gap-3 mt-1">
                      <span className="inline-flex items-center gap-1"><Calendar className="w-3 h-3" /> {meeting.meeting_date ? new Date(meeting.meeting_date).toISOString().slice(0,10) : '—'}</span>
                      <span className="inline-flex items-center gap-1"><Clock className="w-3 h-3" /> {meeting.meeting_time}</span>
                      <span>{meeting.duration} min</span>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    meeting.status === 'approved' ? 'bg-green-100 text-green-700' :
                    meeting.status === 'rejected' ? 'bg-red-100 text-red-700' :
                    'bg-yellow-100 text-yellow-700'
                  }`}>
                    {meeting.status.toUpperCase()}
                  </span>
                </div>

                {meeting.status === 'approved' && meeting.loom_link && (
                  <div className="mt-2 text-sm">
                    <span className="text-gray-600">Join link: </span>
                    <a href={meeting.loom_link} target="_blank" rel="noreferrer" className="text-green-700 underline break-all">
                      {meeting.loom_link}
                    </a>
                  </div>
                )}

                {meeting.status === 'rejected' && meeting.rejected_reason && (
                  <div className="mt-2 text-sm text-red-700">Reason: {meeting.rejected_reason}</div>
                )}
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  )
}
