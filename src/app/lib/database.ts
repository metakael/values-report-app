// src/app/lib/database.ts
import { createClient } from '@supabase/supabase-js'

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!
const supabase = createClient(supabaseUrl, supabaseKey)

// Types
interface AccessCode {
  code: string
  used_count: number
  max_uses: number
  active: boolean
}

interface UserSession {
  email: string
  access_code: string
  path_selected?: 'direct' | 'sort'
  completed: boolean
  created_at: Date
}

/**
 * Verify if an access code is valid
 * @param code The access code to verify
 * @returns Boolean indicating if the code is valid and active
 */
export async function verifyAccessCode(code: string): Promise<boolean> {
  try {
    const { data, error } = await supabase
      .from('access_codes')
      .select('*')
      .eq('code', code)
      .eq('active', true)
      .single()

    if (error || !data) {
      console.error('Error verifying access code:', error)
      return false
    }

    const accessCode = data as AccessCode
    
    // Check if the code has reached its maximum number of uses
    if (accessCode.used_count >= accessCode.max_uses) {
      return false
    }

    return true
  } catch (error) {
    console.error('Error in verifyAccessCode:', error)
    return false
  }
}

/**
 * Increment the usage count for an access code
 * @param code The access code to update
 * @returns Boolean indicating if the update was successful
 */
export async function incrementAccessCodeUsage(code: string): Promise<boolean> {
  try {
    const { data, error } = await supabase
      .from('access_codes')
      .select('used_count')
      .eq('code', code)
      .single()

    if (error || !data) {
      console.error('Error fetching access code usage:', error)
      return false
    }

    const currentCount = data.used_count
    
    const { error: updateError } = await supabase
      .from('access_codes')
      .update({ used_count: currentCount + 1 })
      .eq('code', code)

    if (updateError) {
      console.error('Error incrementing access code usage:', updateError)
      return false
    }

    return true
  } catch (error) {
    console.error('Error in incrementAccessCodeUsage:', error)
    return false
  }
}

/**
 * Create a new user session
 * @param email The user's email address
 * @param accessCode The access code used
 * @returns The ID of the created session or null if failed
 */
export async function createUserSession(email: string, accessCode: string): Promise<string | null> {
  try {
    const { data, error } = await supabase
      .from('user_sessions')
      .insert({
        email,
        access_code: accessCode,
        completed: false,
        created_at: new Date()
      })
      .select('id')
      .single()

    if (error || !data) {
      console.error('Error creating user session:', error)
      return null
    }

    return data.id
  } catch (error) {
    console.error('Error in createUserSession:', error)
    return null
  }
}

/**
 * Update the user session with path selection
 * @param sessionId The session ID
 * @param path The selected path ('direct' or 'sort')
 * @returns Boolean indicating if the update was successful
 */
export async function updateSessionPath(sessionId: string, path: 'direct' | 'sort'): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('user_sessions')
      .update({ path_selected: path })
      .eq('id', sessionId)

    if (error) {
      console.error('Error updating session path:', error)
      return false
    }

    return true
  } catch (error) {
    console.error('Error in updateSessionPath:', error)
    return false
  }
}

/**
 * Mark a user session as completed
 * @param sessionId The session ID
 * @returns Boolean indicating if the update was successful
 */
export async function markSessionCompleted(sessionId: string): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('user_sessions')
      .update({ completed: true })
      .eq('id', sessionId)

    if (error) {
      console.error('Error marking session as completed:', error)
      return false
    }

    return true
  } catch (error) {
    console.error('Error in markSessionCompleted:', error)
    return false
  }
}

/**
 * Save user selected values
 * @param sessionId The session ID
 * @param values Array of user's top values with rankings
 * @returns Boolean indicating if the operation was successful
 */
export async function saveUserValues(
  sessionId: string, 
  values: { value: string, rank: number }[]
): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('user_values')
      .insert(
        values.map(({ value, rank }) => ({
          session_id: sessionId,
          value,
          rank
        }))
      )

    if (error) {
      console.error('Error saving user values:', error)
      return false
    }

    return true
  } catch (error) {
    console.error('Error in saveUserValues:', error)
    return false
  }
}

export default supabase